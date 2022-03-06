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
 *                                    - Class: users.controller.ts
 *                                    - Created by: Duy Kh. Van Ba
 *                                    - Created date: 05 Mar, 2022
 *
 **********************************************************************************************************************/

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('api/users')
export class UsersController {
  private logger = new Logger(UsersController.name);
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    this.logger.log(
      `REST request to create new User with email: ${createUserDto.getEmail}`,
    );
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    this.logger.log('REST request to get all users');
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    this.logger.log(`REST request to find user by id: #${id}`);
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    this.logger.log(`REST request to update user by id: #${id}`);
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    this.logger.log(`REST request to remove user by id: #${id}`);
    return this.usersService.remove(id);
  }
}
