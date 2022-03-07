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
import { IsEmail } from 'class-validator';
import { UpdateUserResDto } from './update.user.res.dto';

export class UserDetailReqDto extends UpdateUserResDto {
  @ApiProperty()
  @IsEmail()
  public email: string;

  constructor(
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
  ) {
    super(firstName, lastName, phoneNumber, null, null);
    this.email = email;
  }
}
