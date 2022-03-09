/***********************************************************************************************************************
 *                                   Copyright (C) 2022 Duy Kh. Van Ba duyvbkh134@gmail.com
 *
 *                                    This file is part of Hexon System (www.hexon.systems).
 *
 *                                 -----------------PROPRIETARY INFORMATION-----------------
 *
 *                                                This file can NOT be copied
 *
 *                              and/or distributed without the express permission of Duy Kh. Van Ba
 ***********************************************************************************************************************
 *
 *                                    -----------------FILE INFORMATION-----------------
 *                                    - Project: Personal blog
 *                                    - Class: users.service.ts
 *                                    - Created by: Duy Kh. Van Ba
 *                                    - Created date: 05 Mar, 2022
 *
 **********************************************************************************************************************/

import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginateRawAndEntities,
} from 'nestjs-typeorm-paginate';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { $enum } from 'ts-enum-util';
import { Repository, Transaction, TransactionRepository } from 'typeorm';

import { PaginationModel } from '../common/pagination/pagination.model';
import { ErrorCodes } from '../enums/error-codes';
import { searchParam } from '../helpers/common.helpers';
import { MailService } from '../mail/mail.services';
import { UpdateUserResDto } from './dto/update.user.res.dto';
import { UserDetailDto } from './dto/user.detail.dto';
import { UserDetailReqDto } from './dto/user.detail.req.dto';
import { User } from './entities/user.entity';
import { EmailDto } from '../mail/dto/email.dto';
import { EmailConst } from '../common/email.constants';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectMapper() private readonly mapper: AutoMapper,
    private mailService: MailService,
  ) {}

  @Transaction()
  async create(
    userDto: UserDetailReqDto,
    currentLogin: string,
    @TransactionRepository(User)
    userTransactionRepository: Repository<User> = null,
  ) {
    this.logger.debug(`Create new account: ${JSON.stringify(userDto)}`);

    // TODO: valid not allow ADMIN create upper level account
    // valid exist user

    const existUser = await this.findByEmail(userDto.email);
    if (existUser && existUser.active) {
      throw new ConflictException(
        $enum(ErrorCodes).getKeyOrDefault(ErrorCodes.USER_EXIST_ERROR),
      );
    }

    // add new user

    const userData = this.transformData(userDto, null);
    userData.expiredTime = new Date();

    // Check whether there is inactive account with the same email or not.

    if (existUser && !existUser.active) {
      // reset account for old account

      userData.id = existUser.id;
      userData.active = true;
      userData.deletedDate = null;
      userData.deletedBy = null;
    }
    const user: User = await userTransactionRepository.save(userData);

    // send mail to user

    this.logger.debug(`Send mail to user: ${JSON.stringify(user.email)}`);
    const email = new EmailDto(
      user.email,
      EmailConst.WELCOME_TITLE,
      EmailConst.WELCOME_TEMPLATE,
      user,
    );

    //TODO: Send mail to set password when new account is created

    user.firstName = user.firstName.toUpperCase();
    await this.mailService.sendMail(email, user);

    return this.mapper.map(user, UserDetailDto);
  }

  async findUserById(id: string) {
    this.logger.debug(`Find user by id: #${id}`);
    return this.userRepository.findOne(id);
  }

  async findByEmail(email: string) {
    this.logger.debug(`Find user by email: #${email}`);
    return this.userRepository.findOne({
      where: { _email: email },
      withDeleted: true,
    });
  }

  async findExistUserByEmail(email: string) {
    this.logger.debug(`Find exist user by email: #${email}`);
    const user = await this.findByEmail(email);
    if (!user) {
      throw new NotFoundException(
        $enum(ErrorCodes).getKeyOrDefault(ErrorCodes.USER_NOT_EXIST_ERROR),
      );
    }
    if (!user.active) {
      throw new NotFoundException(
        $enum(ErrorCodes).getKeyOrDefault(ErrorCodes.USER_DEACTIVATED_ERROR),
      );
    }

    return user;
  }

  async findExistUserById(id: string): Promise<User> {
    this.logger.debug(`find exist user by id: #${id}`);
    const user = await this.findUserById(id);
    if (!user) {
      throw new NotFoundException(
        $enum(ErrorCodes).getKeyOrDefault(ErrorCodes.USER_NOT_EXIST_ERROR),
      );
    }
    return user;
  }

  @Transaction()
  async update(
    id: string,
    updateUserResDto: UpdateUserResDto,
    @TransactionRepository(User)
    userTransactionRepository: Repository<User> = null,
  ) {
    this.logger.debug(`Updated user: ${JSON.stringify(updateUserResDto)}`);
    const user = await this.findExistUserById(id);

    user.firstName = updateUserResDto.firstName;
    user.lastName = updateUserResDto.lastName;
    user.fullName = updateUserResDto.firstName
      .concat(' ')
      .concat(updateUserResDto.lastName);
    user.phoneNumber = updateUserResDto.phoneNumber;
    await userTransactionRepository.save(user);
    return this.mapper.map(user, UserDetailDto);
  }

  async delete(userID: string, thisUser: string) {
    if (thisUser === userID) {
      throw new NotFoundException(
        $enum(ErrorCodes).getKeyOrDefault(ErrorCodes.DELETE_YOUR_ACCOUNT),
      );
    }
    this.logger.debug(`Delete user's account with id: ${userID}`);
    const user = await this.findExistUserById(userID);

    //TODO: Soft delete

    await this.userRepository.remove(user);
  }

  private transformData = (cUser: UserDetailReqDto, hashPassword: string) => {
    return new User(
      cUser.firstName,
      cUser.lastName,
      cUser.phoneNumber,
      cUser.email,
      hashPassword,
      cUser.firstName.concat(' ').concat(cUser.lastName),
    );
  };

  async getListUsers(options: IPaginationOptions, email: string) {
    const queryBuilder = this.userRepository.createQueryBuilder('U');
    queryBuilder.orderBy('U.created_date', 'DESC');
    if (email) {
      queryBuilder.andWhere('U.email like :email', {
        email: searchParam(email),
      });
    }

    const result = new PaginationModel<UserDetailDto>([]);
    const [pagination] = await paginateRawAndEntities(queryBuilder, options);
    for (const user of pagination.items) {
      const userDetailDto = await this.getUserRoles(user);
      result.items.push(userDetailDto);
    }
    result.meta = pagination.meta;

    return result;
  }

  async getUserRoles(user: User) {
    this.logger.debug(`Get user role: ${JSON.stringify(user)}`);
    return this.mapper.map(user, UserDetailDto);
  }
}
