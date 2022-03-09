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
 *                                  - Class: auth.service.ts                                                          *
 *                                  - Created by: Duy Kh. Van Ba                                                      *
 *                                  - Created date: Wednesday, Mar 9 2022                                             *
 *                                                                                                                    *
 **********************************************************************************************************************/

import { ConfigService } from '@nestjs/config';
import {
  Injectable,
  Logger,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { $enum } from 'ts-enum-util';
import { Constants } from '../common/constants';
import { ErrorCodes } from '../enums/error-codes';
import { decrypt, encrypt } from '../helpers/common.helpers';
import { TokenService } from '../token/token.service';
import { UserDetailDto } from '../users/dto/user.detail.dto';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './dto/Jwt-payload';
import { LoginDto } from './dto/login.dto';
import { TokenResDto } from './dto/token.res';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @InjectMapper() private readonly mapper: AutoMapper,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
  ) {}

  async login(loginInf: LoginDto): Promise<TokenResDto> {
    this.logger.debug(`Generate token for user: ${loginInf.username}`);
    const user = await this.usersService.findExistUserByEmail(
      loginInf.username,
    );
    const userDetail = await this.usersService.getUserRoles(user);

    // TODO: Pass user's roles and permissions to token

    const userRoles: {
      name: string;
      permissions: string[];
    }[] = [];

    // generate token and refresh token

    const payload = {
      email: userDetail.email,
      sub: userDetail.id,
      roles: userRoles,
    };

    const currentLoggedToken = await this.getCurrentLoggedTokenByUserId(
      user.id,
    );
    if (currentLoggedToken) {
      return currentLoggedToken;
    } else {
      const token = this.jwtService.sign(payload, {
        expiresIn: this.configService.get('JWT_EXP'),
        secret: this.configService.get('JWT_SECRET'),
      });
      const encryptedToken = await encrypt(token);
      const refreshToken = this.jwtService.sign(payload, {
        expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXP'),
        secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      });
      const refreshTokenEncrypted = await encrypt(refreshToken);

      //Insert token to db

      await this.tokenService.storeToke(
        encryptedToken,
        refreshTokenEncrypted,
        user,
      );
      return new TokenResDto(token, refreshToken);
    }
  }

  public async authenticate(credential: LoginDto): Promise<User> {
    this.logger.debug(`Authenticate user: ${credential.username}`);
    const user = await this.usersService.findExistUserByEmail(
      credential.username,
    );
    await this.verifyPassword(credential.password, user.password);
    user.password = undefined;
    return user;
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      this.logger.warn('Pwd does not match!');
      throw new UnauthorizedException(
        $enum(ErrorCodes).getKeyOrDefault(ErrorCodes.WRONG_CREDENTIAL),
      );
    }
  }

  async verifyToken(payload: any, req: Request): Promise<UserDetailDto> {
    const user: User = await this.usersService.findUserById(payload.sub);
    if (!user) {
      throw new UnauthorizedException(
        $enum(ErrorCodes).getKeyOrDefault(
          $enum(ErrorCodes).getKeyOrDefault(ErrorCodes.WRONG_CREDENTIAL),
        ),
      );
    }

    // verify token

    const authentication = req.headers[Constants.AUTH_HEADER];
    const token = authentication.split(' ')[1];
    await this.verifyJwtToken(
      token,
      this.configService.get('JWT_SECRET'),
      false,
    );
    const encryptedToken = await encrypt(token);
    const tokenStored = await this.tokenService.findTokenByValue(
      encryptedToken,
    );
    if (!tokenStored) {
      this.logger.error(`Error when verify token`);
      throw new UnauthorizedException(
        $enum(ErrorCodes).getKeyOrDefault(ErrorCodes.TOKEN_EXPIRED_ERROR),
      );
    }

    // check exist refresh token

    const refreshToken = await this.tokenService.findRefreshTokenByUserId(
      user.id,
    );
    if (!refreshToken) {
      await this.tokenService.deleteTokenByUserId(user.id);
      throw new UnauthorizedException(
        $enum(ErrorCodes).getKeyOrDefault(
          $enum(ErrorCodes).getKeyOrDefault(ErrorCodes.WRONG_CREDENTIAL),
        ),
      );
    }

    // check refresh token expired

    if (refreshToken.expiredAt < new Date()) {
      await this.tokenService.deleteRefreshTokenById(refreshToken.id);
      await this.tokenService.deleteTokenByUserId(user.id);
      throw new UnauthorizedException(
        $enum(ErrorCodes).getKeyOrDefault(
          ErrorCodes.REFRESH_TOKEN_EXPIRED_ERROR,
        ),
      );
    }
    return this.mapper.map(user, UserDetailDto);
  }

  async getAccessTokenFromRefreshToken(
    refreshToken: string,
  ): Promise<TokenResDto> {
    // check if refresh token exist in db

    const encryptedRefToken = await encrypt(refreshToken);
    const storedRefToken = await this.tokenService.findByRefreshToken(
      encryptedRefToken,
    );
    if (!storedRefToken) {
      throw new UnauthorizedException(
        $enum(ErrorCodes).getKeyOrDefault(ErrorCodes.AUTH_UNAUTHORIZED_ERROR),
      );
    }

    // verify refresh token

    let originPayload: JwtPayload;
    try {
      originPayload = await this.verifyJwtToken(
        refreshToken,
        this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
        false,
      );
    } catch (err) {
      this.logger.error(`Error when validate refresh token: ${err}`);
      throw new NotAcceptableException(
        $enum(ErrorCodes).getKeyOrDefault(
          ErrorCodes.REFRESH_TOKEN_EXPIRED_ERROR,
        ),
      );
    }
    const storedAccessToken = await this.tokenService.findTokenById(
      storedRefToken.token.id,
    );
    if (!storedRefToken) {
      await this.tokenService.deleteRefreshTokenById(storedRefToken.id);
      throw new UnauthorizedException(
        $enum(ErrorCodes).getKeyOrDefault(ErrorCodes.AUTH_UNAUTHORIZED_ERROR),
      );
    }

    // Generate new access token

    const payload = { email: originPayload.email, sub: originPayload.sub };
    const newAccessToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get('JWT_EXP'),
      secret: this.configService.get('JWT_SECRET'),
    });
    storedAccessToken.token = await encrypt(newAccessToken);
    await this.tokenService.updateAccessToken(storedAccessToken);
    return new TokenResDto(newAccessToken, refreshToken);
  }

  async logout(id: string): Promise<void> {
    const token = await this.tokenService.findTokenByUserId(id);
    if (!token) {
      return;
    }
    await this.tokenService.deleteRefreshTokenByTokenId(token.id);
    await this.tokenService.deleteTokenByUserId(id);
  }

  private async verifyJwtToken(
    token: string,
    secret: string,
    ignoreExpiration: boolean,
  ): Promise<JwtPayload> {
    return this.jwtService.verify(token, {
      secret: secret,
      ignoreExpiration: ignoreExpiration,
    });
  }

  async getCurrentLoggedTokenByUserId(userId: string): Promise<TokenResDto> {
    const storageToke = await this.tokenService.findTokenByUserId(userId);
    const tokenRes = new TokenResDto(null, null);
    try {
      if (storageToke) {
        const decryptToken = await decrypt(storageToke.token);
        this.jwtService.verify(decryptToken, {
          secret: this.configService.get('JWT_TOKEN_SECRET'),
          ignoreExpiration: false,
        });
        tokenRes.accessToken = decryptToken;

        const storageRefreshToken =
          await this.tokenService.findRefreshTokenByUserId(userId);
        if (storageRefreshToken) {
          const decryptRefreshToken = await decrypt(
            storageRefreshToken.refreshToken,
          );
          this.jwtService.verify(decryptRefreshToken, {
            secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
            ignoreExpiration: false,
          });

          tokenRes.refreshToken = decryptRefreshToken;
          return tokenRes;
        } else return null;
      } else return null;
    } catch (err) {
      this.logger.error(
        `token expired, login to get new credential. User: ${userId}`,
        err,
      );
      return null;
    }
  }
}
