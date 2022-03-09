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
 *                                  - Class: 1646819307852-Init-Default-Account.ts                                    *
 *                                  - Created by: Duy Kh. Van Ba                                                      *
 *                                  - Created date: Wednesday, Mar 9 2022                                             *
 *                                                                                                                    *
 **********************************************************************************************************************/

import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDefaultAccount1646819307852 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    const sql = `INSERT INTO user (id, first_name, last_name, email, password)
                 VALUES ('f3499b6a-560c-4694-90a2-86f2a68b062c', 'System', 'Admin', 'admin@hexon.systems',
                         '$2b$10$XGvqfX56MDtndif.qil2oe/wYREOHnMBgSgufhIhoM8iZsYE9iPQy'),
                        ('9acf9106-cfe3-416e-86d0-b51aa3cc10cb', 'Hexon', 'Dev Team', 'dev@hexon.systems',
                         '$2b$10$XGvqfX56MDtndif.qil2oe/wYREOHnMBgSgufhIhoM8iZsYE9iPQy') `;
    await queryRunner.query(sql);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    const sql = `DELETE
                 FROM user
                 WHERE email IN ('admin@hexon.systems', 'dev@hexon.systems') `;
    await queryRunner.query(sql);
  }
}
