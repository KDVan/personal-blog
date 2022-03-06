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
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ required: true })
  @IsEmail()
  @IsNotEmpty()
  private email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  private password: string;

  @ApiProperty({ required: false })
  @IsString()
  private firstname: string;

  @ApiProperty({ required: false })
  @IsString()
  private lastname: string;

  @ApiProperty({ required: false })
  @IsPhoneNumber()
  private phoneNumber?: string;

  constructor(
    firstname: string,
    lastname: string,
    phoneNumber: string,
    email: string,
    password: string,
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.password = password;
  }
  public get getEmail(): string {
    return this.email;
  }
  public set setEmail(email: string) {
    this.email = email;
  }
  public get getPassword(): string {
    return this.password;
  }
  public set setPassword(password: string) {
    this.password = password;
  }
  public get getFirstname(): string {
    return this.firstname;
  }
  public set setFirstname(firstname: string) {
    this.firstname = firstname;
  }
  public get getLastname(): string {
    return this.lastname;
  }
  public set setLastname(lastname: string) {
    this.lastname = lastname;
  }
  public get getPhoneNumber(): string {
    return this.phoneNumber;
  }
  public set setPhoneNumber(phoneNumber: string) {
    this.phoneNumber = phoneNumber;
  }
}
