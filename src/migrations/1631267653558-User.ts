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
 *                                  - Class: 1631267653558-User.ts                                                    *
 *                                  - Created by: Duy Kh. Van Ba                                                      *
 *                                  - Created date: Wednesday, Mar 9 2022                                             *
 *                                                                                                                    *
 **********************************************************************************************************************/

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class User1631267653000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isUnique: true,
            isNullable: false,
            width: 128,
          },
          {
            name: 'first_name',
            type: 'varchar',
            width: 255,
            isNullable: true,
          },
          {
            name: 'last_name',
            type: 'varchar',
            width: 255,
            isNullable: true,
          },
          {
            name: 'full_name',
            type: 'varchar',
            width: 255,
            isNullable: true,
          },
          {
            name: 'email',
            type: 'varchar',
            width: 255,
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            width: 255,
            isNullable: true,
          },
          {
            name: 'phone_number',
            type: 'varchar',
            width: 64,
            isNullable: true,
          },
          {
            name: 'created_date',
            type: 'datetime ',
            isNullable: true,
          },
          {
            name: 'created_by',
            type: 'varchar',
            width: 128,
            isNullable: true,
          },
          {
            name: 'updated_date',
            type: 'datetime ',
            isNullable: true,
          },
          {
            name: 'updated_by',
            type: 'varchar',
            width: 128,
            isNullable: true,
          },
          {
            name: 'deleted_date',
            type: 'datetime ',
            isNullable: true,
          },
          {
            name: 'deleted_by',
            type: 'varchar',
            width: 128,
            isNullable: true,
          },
          {
            name: 'active',
            type: 'bool',
            default: true,
          },
          {
            name: 'expired_time',
            type: 'datetime ',
            isNullable: true,
          },
        ],
      }),
      false,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE user`);
  }
}
