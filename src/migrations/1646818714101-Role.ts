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
 *                                  - Class: 1646818714101-Role.ts                                                    *
 *                                  - Created by: Duy Kh. Van Ba                                                      *
 *                                  - Created date: Wednesday, Mar 9 2022                                             *
 *                                                                                                                    *
 **********************************************************************************************************************/

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Role1646818714101 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'role',
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
            name: 'name',
            type: 'varchar',
            width: 255,
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            width: 255,
          },
          {
            name: 'active',
            type: 'bool',
            default: true,
          },
          {
            name: 'created_date',
            type: 'datetime',
            isNullable: true,
            default: 'now()',
          },
          {
            name: 'created_by',
            type: 'varchar',
            width: 128,
            isNullable: true,
          },
          {
            name: 'updated_date',
            type: 'datetime',
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
            type: 'datetime',
            isNullable: true,
          },
          {
            name: 'deleted_by',
            type: 'varchar',
            width: 128,
            isNullable: true,
          },
        ],
      }),
      false,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE role`);
  }
}
