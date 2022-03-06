/**********************************************************************************************************************\
*                                   Copyright (C) 2021 Duy Kh. Van Ba duyvbkh134@gmail.com                             *
*                                                                                                                      *
*                                   This file is part of Document Management System (DoMa).                            *
*                                                                                                                      *
*                                 -----------------PROPRIETARY INFORMATION-----------------                            *
*                                                                                                                      *
*                                     Document Management System (DoMa) can NOT be copied                              *
*                                                                                                                      *
*                              and/or distributed without the express permission of Duy Kh. Van Ba                     *
\**********************************************************************************************************************/

import { ApiProperty } from '@nestjs/swagger';

export class UserDetailDto {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public email: string;

  @ApiProperty()
  public firstName: string;

  @ApiProperty()
  public lastName: string;

  @ApiProperty()
  public phoneNumber: string;

  @ApiProperty()
  public active: boolean;

  constructor(
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    active: boolean,
  ) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.active = active;
  }
}
