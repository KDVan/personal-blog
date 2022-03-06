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

import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorCodes } from '../enums/error-codes';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    this.logger.debug(`Create new user`);
    const user = this.transformData(createUserDto);
    const result: User = await this.userRepository.save(user);
    this.logger.debug(`user info: ${JSON.stringify(result)}`);
    this.logger.debug(`new user id: ${result.getId}`);
    return result;
  }

  async findAll() {
    const users = await this.userRepository.find();
    this.logger.debug(`users: ${JSON.stringify(users)}`);
    return users;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(ErrorCodes.USER_NOT_EXIST_ERROR);
    }
    this.logger.debug(`user info: ${JSON.stringify(user)}`);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    user.setFirstname = updateUserDto.getFirstname;
    user.setLastname = updateUserDto.getLastname;
    user.setFullname =
      updateUserDto.getFirstname + ' ' + updateUserDto.getLastname;
    user.setPhoneNumber = updateUserDto.getPhoneNumber;
    user.setEmail = updateUserDto.getEmail;
    const userUpdated = await this.userRepository.save(user);
    this.logger.debug(`Updated user: ${JSON.stringify(userUpdated)}`);
    return userUpdated;
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    user.setActive = false;
    this.userRepository.save(user);
  }

  private transformData = (cUser) => {
    return new User(
      cUser.getFirstname,
      cUser.getLastname,
      cUser.getPhoneNumber,
      cUser.getEmail,
      cUser.getPassword,
      'Admin',
      null,
      null,
      cUser.getFirstname + ' ' + cUser.getLastname,
    );
  };
}
