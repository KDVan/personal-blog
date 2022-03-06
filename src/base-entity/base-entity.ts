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
  private id: string;

  @Column({ default: () => true, name: 'active' })
  private active: boolean;

  @CreateDateColumn({
    name: 'created_date',
    default: () => `now()`,
    nullable: false,
  })
  private createdDate: Date;

  @Column({ name: 'created_by', width: 128 })
  private createdBy: string;

  @UpdateDateColumn({ name: 'updated_date', default: () => `now()` })
  private updatedDate: Date;

  @Column({ name: 'updated_by', width: 128 })
  private updatedBy: string;

  @DeleteDateColumn({ name: 'deleted_date', default: () => `now()` })
  private deletedDate: Date;

  @Column({ name: 'deleted_by', width: 128 })
  private deletedBy: string;

  protected constructor(
    createdBy: string,
    updatedBy: string,
    deletedBy: string,
  ) {
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
    this.deletedBy = deletedBy;
  }

  public get getId(): string {
    return this.id;
  }

  public set setId(id: string) {
    this.id = id;
  }

  public get isActive(): boolean {
    return this.active;
  }

  public set setActive(active: boolean) {
    this.active = active;
  }

  public get getCreatedDate(): Date {
    return this.createdDate;
  }

  public set setCreatedDate(createdDate: Date) {
    this.createdDate = createdDate;
  }

  public get getCreatedBy(): string {
    return this.createdBy;
  }

  public set setCreatedBy(createdBy: string) {
    this.createdBy = createdBy;
  }

  public get getUpdatedDate(): Date {
    return this.updatedDate;
  }

  public set setUpdatedDate(updatedDate: Date) {
    this.updatedDate = updatedDate;
  }

  public get getUpdatedBy(): string {
    return this.updatedBy;
  }

  public set setUpdatedBy(updatedBy: string) {
    this.updatedBy = updatedBy;
  }

  public get getDeletedDate(): Date {
    return this.deletedDate;
  }

  public set setDeletedDate(deletedDate: Date) {
    this.deletedDate = deletedDate;
  }

  public get getDeletedBy(): string {
    return this.deletedBy;
  }

  public set setDeletedBy(deletedBy: string) {
    this.deletedBy = deletedBy;
  }
}
