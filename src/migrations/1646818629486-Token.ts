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
 *                                  - Class: 1646818629486-Token.ts                                                   *
 *                                  - Created by: Duy Kh. Van Ba                                                      *
 *                                  - Created date: Wednesday, Mar 9 2022                                             *
 *                                                                                                                    *
 **********************************************************************************************************************/

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Token1646818629486 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'refresh_token',
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
            name: 'token',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'expired_at',
            type: 'datetime',
          },
          {
            name: 'token_id',
            type: 'varchar',
            isNullable: false,
          },
        ],
      }),
      false,
    );

    await queryRunner.createTable(
      new Table({
        name: 'token',
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
            name: 'token',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'user_id',
            type: 'varchar',
            width: 255,
            isNullable: false,
            isUnique: true,
          },
        ],
      }),
      false,
    );

    await queryRunner.query(
      'ALTER TABLE refresh_token ADD CONSTRAINT fk_token_id FOREIGN KEY (token_id) REFERENCES token(id)',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE refresh_token DROP FOREIGN KEY fk_token_id',
    );
    await queryRunner.query(`DROP TABLE refresh_token`);
    await queryRunner.query(`DROP TABLE token`);
  }
}
