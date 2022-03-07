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
 *                                    - Created by: Duy Kh. Van Ba
 *                                    - Created date: 05 Mar, 2022
 *
 **********************************************************************************************************************/

import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { RoleEnum } from '../../enums/role.enum';

export class CreateUserReqDto {
  @ApiProperty()
  @IsEmail()
  public email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public lastName: string;

  @ApiProperty({ required: false })
  @IsMobilePhone()
  public phoneNumber: string;

  @ApiProperty({
    description: 'RoleEntity In SYSTEM_ADMIN, ADMIN, MANAGER, STUDENT',
    default: 'ROLE_ADMIN',
  })
  @IsEnum(RoleEnum, {
    message: 'role is invalid',
  })
  public role: string;

  constructor(
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    role: string,
  ) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.role = role;
  }
}
