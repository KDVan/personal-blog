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
 *                                    - Class: constants.ts
 *                                    - Created by: Duy Kh. Van Ba
 *                                    - Created date: 05 Mar, 2022
 *
 **********************************************************************************************************************/

import { LogLevel } from '@nestjs/common/services/logger.service';

export const Constants = {
  JWT_GUARD_CONST: 'jwt',
  LOCAL_GUARD_CONST: 'local',
  SUCCESS_CONST: 'Success',
  AUTH_ACCESS_TOKEN_CONST: 'access-token',
  AUTH_BEARER_CONST: 'bearer',
  AUTH_JWT_CONST: 'JWT',
  CORS_METHODS_C0NST: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  CORS_ORIGIN_CONST: '*',
  SALT_OR_ROUNDS: 10,
  DEFAULT_PASSWORD: 'P@ssword123456',
  API_PREFIX: 'api',
  PROFILE_DEV_CONST: 'dev',
  SERVER_PREFIX: '/core',
  TOKEN: 'token',
  EMAIL: 'email',
  URL: 'url',
  TOKEN_EXPIRY_TIME: 5,
  FORGOT_PASSWORD_URL: '/forgot-password',
  AES_ALGORITHM: 'aes-256-ctr',
  SALT: 'salt',
  ARRAY_BUFFER_SIXTEEN: 16,
  ARRAY_BUFFER_THIRTY_TWO: 32,
  MILLISECONDS: 1000,
  SECONDS_IN_MINUTES: 60,
  MINUTES_IN_HOUR: 60,
  HOUR_OF_DAY: 24,
  COLON: ':',
  PERCENT: '%',
  AUTH_HEADER: 'authorization',
  UNDEFINED_CONST: 'undefined',
  GROUP_LIMIT_LEVEL: 3,
  PARENT_ID: 'parentId',
  DEFAULT_LIMIT: 10,
  DEFAULT_PAGE: 1,
  MULTIPART_FORM_DATA: 'multipart/form-data',
  CHILDREN_KEY: 'children',
  CHILD_KEY: 'child',
  DOT: '.',
  DOT_REGEX: /\./,
  COMMA_REGEX: /,/,
  FILENAME_MAX_LENGTH: 255,
  HYPHEN: '-',
  AWS_TEMPLATES_FOLDER: 'templates',
  AWS_DOCUMENT_FOLDER: 'documents',
  SLASH: '/',
  ROOT_TEMPLATE_FOLDER: 'ROOT_TEMPLATE_FOLDER',
  ROOT_MY_DOCUMENT_FOLDER: 'ROOT_MY_DOCUMENT_FOLDER',
  EMPTY: '',
  UNDERSCORE: '_',
  OPEN_BRACKET: '(',
  CLOSE_BRACKET: ')',
  LARGER_SYMBOL: '>',
};

export const BUFFER_ENCODING_HEX = 'hex';
export const BUFFER_ENCODING_BASE_64 = 'base64';
export const RSA_DECRYPT_OAEP_SHA256 = 'sha256';
export const UTF8 = 'utf8';
export const ASC = 'ASC';
export const DESC = 'DESC';

export const LOG_LEVEL_DEV: LogLevel[] = [
  'log',
  'debug',
  'error',
  'verbose',
  'warn',
];
export const LOG_LEVEL_PROD: LogLevel[] = ['error', 'warn'];
