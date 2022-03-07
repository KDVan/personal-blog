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
 *                                    - Class: base-entity.ts
 *                                    - Created by: Duy Kh. Van Ba
 *                                    - Created date: 05 Mar, 2022
 *
 **********************************************************************************************************************/

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  private _id: string;

  @Column({ default: () => true, name: 'active' })
  private _active: boolean;

  @CreateDateColumn({
    name: 'created_date',
    default: () => `now()`,
    nullable: false,
  })
  private _createdDate: Date;

  @Column({ name: 'created_by', width: 128 })
  private _createdBy: string;

  @UpdateDateColumn({ name: 'updated_date', default: () => `now()` })
  private _updatedDate: Date;

  @Column({ name: 'updated_by', width: 128 })
  private _updatedBy: string;

  @DeleteDateColumn({ name: 'deleted_date', default: () => `now()` })
  private _deletedDate: Date;

  @Column({ name: 'deleted_by', width: 128 })
  private _deletedBy: string;

  public get id(): string {
    return this._id;
  }

  public set id(id: string) {
    this._id = id;
  }

  public get active(): boolean {
    return this._active;
  }

  public set active(active: boolean) {
    this._active = active;
  }

  public get createdDate(): Date {
    return this._createdDate;
  }

  public set createdDate(createdDate: Date) {
    this._createdDate = createdDate;
  }

  public get createdBy(): string {
    return this._createdBy;
  }

  public set createdBy(createdBy: string) {
    this._createdBy = createdBy;
  }

  public get updatedDate(): Date {
    return this._updatedDate;
  }

  public set updatedDate(updatedDate: Date) {
    this._updatedDate = updatedDate;
  }

  public get updatedBy(): string {
    return this._updatedBy;
  }

  public set updatedBy(updatedBy: string) {
    this._updatedBy = updatedBy;
  }

  public get deletedDate(): Date {
    return this._deletedDate;
  }

  public set deletedDate(deletedDate: Date) {
    this._deletedDate = deletedDate;
  }

  public get deletedBy(): string {
    return this._deletedBy;
  }

  public set deletedBy(deletedBy: string) {
    this._deletedBy = deletedBy;
  }
}
