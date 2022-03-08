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
 *                                    - Class: users.module.ts
 *                                    - Created by: Duy Kh. Van Ba
 *                                    - Created date: 05 Mar, 2022
 *
 **********************************************************************************************************************/

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { AutoMapper, InjectMapper, mapFrom } from 'nestjsx-automapper';
import { UserDetailDto } from './dto/user.detail.dto';
import { MailService } from '../mail/mail.services';

@Module({
  controllers: [UsersController],
  providers: [UsersService, MailService],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {
  constructor(@InjectMapper() private readonly mapper: AutoMapper) {
    this.mapper
      .createMap(User, UserDetailDto)
      .forMember(
        (d) => d.id,
        mapFrom((s) => s.id),
      )
      .forMember(
        (d) => d.active,
        mapFrom((s) => s.active),
      );
  }
}
