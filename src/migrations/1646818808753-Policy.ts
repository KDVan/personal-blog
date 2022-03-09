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
 *                                  - Class: 1646818808753-Policy.ts                                                  *
 *                                  - Created by: Duy Kh. Van Ba                                                      *
 *                                  - Created date: Wednesday, Mar 9 2022                                             *
 *                                                                                                                    *
 **********************************************************************************************************************/

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Policy1646818808753 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'policy',
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
            name: 'role_id',
            type: 'varchar',
            width: 255,
          },
          {
            name: 'permission_id',
            type: 'varchar',
            width: 255,
          },
        ],
      }),
      false,
    );

    const sql =
      'ALTER TABLE policy ' +
      'ADD CONSTRAINT FK_Policy_Role_0 FOREIGN KEY (role_id) REFERENCES role(id), ' +
      'ADD CONSTRAINT FK_Policy_Permission_0 FOREIGN KEY (permission_id) REFERENCES permission(id) ';
    await queryRunner.query(sql);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const sql =
      'ALTER TABLE policy DROP FOREIGN KEY FK_Policy_Role_0, DROP FOREIGN KEY FK_Policy_Permission_0 ';
    await queryRunner.query(sql);

    const sqlDropTable = 'DROP TABLE IF EXISTS policy; ';
    await queryRunner.query(sqlDropTable);
  }
}
