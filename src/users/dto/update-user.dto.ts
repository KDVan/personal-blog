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
import { IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends CreateUserDto {
  @ApiProperty({ required: false })
  @IsString()
  private id: string;

  public get getId(): string {
    return this.id;
  }
  public set setId(id: string) {
    this.id = id;
  }
}
