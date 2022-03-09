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
 *                                  - Class: 1646818834765-Init-Default-Permissions.ts                                *
 *                                  - Created by: Duy Kh. Van Ba                                                      *
 *                                  - Created date: Wednesday, Mar 9 2022                                             *
 *                                                                                                                    *
 **********************************************************************************************************************/

import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDefaultPermissions1646818834765 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO personal_blog.permission (id, name, description)
                             VALUES ('da134da0-b9a2-4f3e-a9ce-a7e9cde2ceae', 'PERM_CREATE_USER', 'Create user'),
                                    ('252b3157-939e-481a-a976-161ae58f009a', 'PERM_UPDATE_USER', 'Update user'),
                                    ('86bb7521-9385-4069-8017-717315a81dad', 'PERM_DEACTIVATE_USER',
                                     'Deactivate user account'),
                                    ('da4b55cd-2f17-4e82-b3e1-20bd29b06ffc', 'PERM_VIEW_LIST_USER', 'View list user'),
                                    ('bdb4f853-4ecc-4158-ac59-5ea3a0155fd6', 'PERM_VIEW_DETAIL_USER',
                                     'View detail user'),
                                    ('cc7b1d4a-4edb-4755-a265-402974b668eb', 'PERM_VIEW_DETAIL_ROLE',
                                     'View detail role'),
                                    ('d4afc634-5a4c-454f-9308-2dde8c8ba416', 'PERM_VIEW_DETAIL_GROUP',
                                     'View detail group'),
                                    ('d2d918b0-b946-4310-ac8b-d86ab3bfae94', 'PERM_VIEW_SCREEN', 'View screen'),
                                    ('015b52be-36e7-41d0-b706-c7bf3c4dd891', 'PERM_VIEW_PERMISSION', 'View permission'),
                                    ('85f867d9-0b54-4c38-afbf-6eac0d4f9aec', 'PERM_UPDATE_ROLE_USER',
                                     'Update user role'),
                                    ('3cd98735-5217-4fa2-8f41-a048b390cc44', 'PERM_UPDATE_PERMISSION_USER',
                                     'Update user isolate permission'),
                                    ('f64f690b-207a-4f5f-b7a3-aa39a751ffcd', 'PERM_CREATE_GROUP', 'Create group'),
                                    ('245c8c42-4c83-4d40-b43b-6c14d2e1483b', 'PERM_REMOVE_GROUP', 'Remove group'),
                                    ('98fd1deb-4902-48e0-b9cb-049e84bce3c5', 'PERM_UPDATE_GROUP', 'Update group'),
                                    ('a39633ea-ef2d-4ebd-978c-d0061b94195a', 'PERM_ADD_USER_TO_GROUP',
                                     'Add user to group'),
                                    ('e220da4c-4eb3-4bd9-9b60-75fa603b04ae', 'PERM_UPDATE_USER_TO_GROUP',
                                     'Update user to group'),
                                    ('c12311c1-bf3a-4980-861d-2c5597a0dd54', 'PERM_REMOVE_USER_FROM_GROUP',
                                     'Remove user from group'),
                                    ('ca071bd1-b926-4875-94c0-1cd71c8bd817', 'PERM_ADD_CHILD_GROUP', 'Add child group'),
                                    ('3cfb48ce-f41d-4432-8092-d6dacab19f36', 'PERM_UPDATE_CHILD_GROUP',
                                     'Update child group'),
                                    ('43b3351c-0ad3-44dc-a158-d0cd6658e6a6', 'PERM_REMOVE_CHILD_GROUP',
                                     'Remove child group'),
                                    ('29df9cde-e20c-4d75-a2d1-e8a870a6fb8f', 'PERM_ADD_PERMISSION_TO_GROUP',
                                     'Add permission to group'),
                                    ('6914c528-1717-45f1-a785-5bac0be7c3a8', 'PERM_UPDATE_PERMISSION_TO_GROUP',
                                     'Update permission to group'),
                                    ('f65007e6-39ac-4e3f-956e-59111be11d43', 'PERM_REMOVE_PERMISSION_TO_GROUP',
                                     'Remove permission from group'),
                                    ('9056290b-9d44-444d-af32-4885ec26830d', 'PERM_VIEW_LIST_GROUP', 'View list group'),
                                    ('3c0a7a9d-255b-468f-a2a7-7bd51be0a93c', 'PERM_DELETE_USER',
                                     'Delete user from system'),
                                    ('04717f58-70fa-4c04-8580-5325dc8fde13', 'PERM_VIEW_LIST_ROLE', 'View list role'),
                                    ('24993bd2-b525-46a8-9cc9-9811e7fcec76', 'PERM_CREATE_ROLE', 'Create new role'),
                                    ('13b58fd1-5977-4d98-b18d-c58ac5b2cb45', 'PERM_UPDATE_ROLE', 'Update role'),
                                    ('4cd680b5-158b-4cb1-9dc7-a8c3048778a1', 'PERM_DELETE_ROLE', 'Delete role'),
                                    ('ffbafcba-0810-41a9-9be0-a8761e084a43', 'PERM_CREATE_TEMPLATE', 'Create template'),
                                    ('ec16d586-2049-4df1-b18d-8fc24dda9c3a', 'PERM_UPDATE_TEMPLATE', 'Update template'),
                                    ('ed79e5a7-199a-414e-8ed2-f168148f7a84', 'PERM_DELETE_TEMPLATE', 'Delete template'),
                                    ('adac4d81-cd0b-4928-a814-0f0a06ff0d7d', 'PERM_VIEW_LIST_USER_IN_GROUP',
                                     'View list user in group');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('TRUNCATE TABLE permission');
  }
}
