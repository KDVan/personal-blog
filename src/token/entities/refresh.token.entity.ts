/**********************************************************************************************************************
 *                                                                                                                    *
 *                            Copyright (C) 2021 - 2022 Duy Kh. Van Ba duyvbkh134@gmail.com                           *
 *                                                                                                                    *
 *                                This file is part of Hexon System (www.hexon.systems)                               *
 *                                                                                                                    *
 *                              -----------------PROPRIETARY INFORMATION-----------------                             *
 *                                                                                                                    *
 *                                             This file can NOT be copied                                            *
 *                                                                                                                    *
 *                         and/or distributed without the express permission of Duy Kh. Van Ba                        *
 *                                                                                                                    *
 * ********************************************************************************************************************
 *                                                                                                                    *
 *                                  -----------------FILE INFORMATION-----------------                                *
 *                                  - Project: Personal blog                                                          *
 *                                  - Class: refresh.token.entity.ts                                                  *
 *                                  - Created by: Duy Kh. Van Ba                                                      *
 *                                  - Created date: Wednesday, Mar 9 2022                                             *
 *                                                                                                                    *
 **********************************************************************************************************************/

import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Token } from './token.entity';

@Entity('refresh_token')
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  private _id: string;

  @Column({ name: 'token', width: 255, nullable: false })
  private _refreshToken: string;

  @Column({ name: 'expired_at', nullable: false })
  private _expiredAt: Date;

  @OneToOne(() => Token)
  @JoinColumn({ name: 'token_id' })
  private _token: Token;

  constructor(_refreshToken: string, _expiredAt: Date, _token: Token) {
    this._refreshToken = _refreshToken;
    this._expiredAt = _expiredAt;
    this._token = _token;
  }

  public get refreshToken(): string {
    return this._refreshToken;
  }

  public set refreshToken(value: string) {
    this._refreshToken = value;
  }

  public get id(): string {
    return this._id;
  }

  public set id(value: string) {
    this._id = value;
  }

  public get expiredAt(): Date {
    return this._expiredAt;
  }

  public set expiredAt(value: Date) {
    this._expiredAt = value;
  }

  public get token(): Token {
    return this._token;
  }

  public set token(value: Token) {
    this._token = value;
  }
}
