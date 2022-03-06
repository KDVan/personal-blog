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

import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../base-entity/base-entity';

@Entity('user')
export class User extends BaseEntity {
  @Column({ name: 'first_name', width: 255 })
  private firstname: string;

  @Column({ name: 'last_name', width: 255 })
  private lastname: string;

  @Column({ name: 'full_name', width: 255 })
  private fullname: string;

  @Column({ name: 'email', width: 255, unique: true })
  private email: string;

  @Column({ name: 'password', width: 255 })
  private password: string;

  @Column({ name: 'phone_number', width: 64 })
  private phoneNumber: string;

  constructor(
    firstname: string,
    lastname: string,
    phoneNumber: string,
    email: string,
    password: string,
    createdBy: string,
    updatedBy: string,
    deletedBy: string,
    fullname: string,
  ) {
    super(createdBy, updatedBy, deletedBy);
    this.firstname = firstname;
    this.lastname = lastname;
    this.fullname = fullname;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.password = password;
  }
  public get getFirstname(): string {
    return this.firstname;
  }
  set setFirstname(firstname: string) {
    this.firstname = firstname;
  }
  public get getLastname(): string {
    return this.lastname;
  }
  public set setLastname(lastname: string) {
    this.lastname = lastname;
  }
  public get getFullname(): string {
    return this.fullname;
  }
  public set setFullname(fullname: string) {
    this.fullname = fullname;
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
  public get getPhoneNumber(): string {
    return this.phoneNumber;
  }
  public set setPhoneNumber(phoneNumber: string) {
    this.phoneNumber = phoneNumber;
  }
}
