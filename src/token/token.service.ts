/**********************************************************************************************************************
 *                                                                                                                    *
 *                            Copyright (C) 2021 - 2022 Duy Kh. Van Ba duyvbkh134@gmail.com                           *
 *                                                                                                                    *
 *                                This file is part of Hexon System (www.hexon.systems)                               *
 *                                                                                                                    *
 *                              -----------------PROPRIETARY INFORMATION-----------------                             *
 *                                                                                                                    *
 *                                             This file can NOT be copied                                            *
 *                                                                                                                    *
 *                         and/or distributed without the express permission of Duy Kh. Van Ba                        *
 *                                                                                                                    *
 * ********************************************************************************************************************
 *                                                                                                                    *
 *                                  -----------------FILE INFORMATION-----------------                                *
 *                                  - Project: Personal blog                                                          *
 *                                  - Class: token.service.ts                                                         *
 *                                  - Created by: Duy Kh. Van Ba                                                      *
 *                                  - Created date: Wednesday, Mar 9 2022                                             *
 *                                                                                                                    *
 **********************************************************************************************************************/

import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { Repository, Transaction, TransactionRepository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { RefreshToken } from './entities/refresh.token.entity';
import { Token } from './entities/token.entity';

@Injectable()
export class TokenService {
  private readonly logger = new Logger(TokenService.name);

  constructor(
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
    private readonly configService: ConfigService,
  ) {}

  @Transaction()
  async storeToke(
    token: string,
    refreshToken: string,
    user: User,
    @TransactionRepository(RefreshToken)
    refreshTokenRepository: Repository<RefreshToken> = null,
    @TransactionRepository(Token)
    tokenRepository: Repository<Token> = null,
  ): Promise<void> {
    this.logger.debug(
      `Store token and refresh token into db, user: ${user.email}`,
    );
    const expiredAt = moment()
      .add(this.configService.get('JWT_REFRESH_TOKEN_EXP'), 's')
      .toDate();
    const oldToken = await this.tokenRepository.findOne({
      where: { _user: user.id },
    });

    if (!oldToken) {
      // insert new token

      let tokenInf = new Token(user, token);
      tokenInf = await tokenRepository.save(tokenInf);

      // insert new refresh token

      const refreshTokenInf = new RefreshToken(
        refreshToken,
        expiredAt,
        tokenInf,
      );
      await refreshTokenRepository.save(refreshTokenInf);
    } else {
      // update token

      oldToken.token = token;
      await tokenRepository.save(oldToken);
      const oldRefreshToken = await this.refreshTokenRepository.find({
        where: { _token: oldToken },
      });
      if (oldRefreshToken) {
        oldRefreshToken[0].refreshToken = refreshToken;
        await refreshTokenRepository.save(oldRefreshToken);
      }
    }
  }

  async findByRefreshToken(encryptedRefToken: string): Promise<RefreshToken> {
    return this.refreshTokenRepository.findOne({
      where: { _refreshToken: encryptedRefToken },
      relations: ['_token'],
    });
  }

  async findRefreshTokenByUserId(userId: string): Promise<RefreshToken> {
    return this.refreshTokenRepository
      .createQueryBuilder('refresh')
      .leftJoinAndSelect('refresh._token', 'token')
      .leftJoinAndSelect('token._user', 'user')
      .where('user._id = :id', { id: userId })
      .getOne();
  }

  async findTokenByUserId(userId: string): Promise<Token> {
    return this.tokenRepository.findOne({ where: { _user: userId } });
  }

  async deleteTokenByUserId(userId: string): Promise<void> {
    const result = await this.tokenRepository
      .createQueryBuilder('token')
      .where('user_id = :userId', { userId: userId })
      .delete()
      .execute();
    this.logger.debug(
      `Delete token by user id. Affect record: ${result.affected}`,
    );
  }

  async deleteRefreshTokenById(id: string): Promise<void> {
    const result = await this.refreshTokenRepository.delete(id);
    this.logger.debug(
      `Delete refresh token by id. Affect record: ${result.affected}`,
    );
  }

  async deleteRefreshTokenByTokenId(tokenId: string): Promise<void> {
    const result = await this.refreshTokenRepository
      .createQueryBuilder('refresh')
      .where('token_id = :id', { id: tokenId })
      .delete()
      .execute();
    this.logger.debug(`Delete token by id. Affect record: ${result.affected}`);
  }

  async findTokenById(id: string): Promise<Token> {
    return this.tokenRepository.findOne({ where: { _id: id } });
  }

  async findTokenByValue(value: string): Promise<Token> {
    return this.tokenRepository.findOne({ where: { _token: value } });
  }

  @Transaction()
  async updateAccessToken(
    accessToken: Token,
    @TransactionRepository(Token)
    tokenRepository: Repository<Token> = null,
  ): Promise<void> {
    await tokenRepository.save(accessToken);
  }
}
