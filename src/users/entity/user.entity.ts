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
 *                                    - Class: user.entity.ts
 *                                    - Created by: Duy Kh. Van Ba
 *                                    - Created date: 05 Mar, 2022
 *
 **********************************************************************************************************************/

import { Exclude } from 'class-transformer';
import { AutoMap } from 'nestjsx-automapper';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../base-entity/base-entity';

@Entity('user')
export class User extends BaseEntity {
  @Column({ name: 'first_name', width: 255 })
  private _firstName: string;

  @Column({ name: 'last_name', width: 255 })
  private _lastName: string;

  @Column({ name: 'full_name', width: 255 })
  private _fullName: string;

  @Column({ name: 'email', width: 255, unique: true })
  private _email: string;

  @Exclude()
  @Column({ name: 'password', width: 255 })
  private _password: string;

  @Column({ name: 'phone_number', width: 64 })
  private _phoneNumber: string;

  @Column({ name: 'expired_time', width: 50 })
  private _expiredTime: Date;

  constructor(
    _firstname: string,
    _lastname: string,
    _phoneNumber: string,
    _email: string,
    _password: string,
    _fullname: string,
  ) {
    super();
    this._lastName = _lastname;
    this._firstName = _firstname;
    this._fullName = _fullname;
    this._email = _email;
    this._phoneNumber = _phoneNumber;
    this._password = _password;
  }

  @AutoMap()
  public get firstName(): string {
    return this._firstName;
  }

  set firstName(firstname: string) {
    this._firstName = firstname;
  }

  public get lastName(): string {
    return this._lastName;
  }

  public set lastName(lastname: string) {
    this._lastName = lastname;
  }

  public get fullName(): string {
    return this._fullName;
  }

  public set fullName(fullname: string) {
    this._fullName = fullname;
  }

  public get email(): string {
    return this._email;
  }

  public set email(email: string) {
    this._email = email;
  }

  public get password(): string {
    return this._password;
  }

  public set password(password: string) {
    this._password = password;
  }

  public get phoneNumber(): string {
    return this._phoneNumber;
  }

  public set phoneNumber(value: string) {
    this._phoneNumber = value;
  }

  get expiredTime(): Date {
    return this._expiredTime;
  }

  set expiredTime(value: Date) {
    this._expiredTime = value;
  }
}
