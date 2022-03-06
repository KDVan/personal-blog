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
 *                                    - Class: common.helpers.ts
 *                                    - Created by: Duy Kh. Van Ba
 *                                    - Created date: 05 Mar, 2022
 *
 **********************************************************************************************************************/

import { BadRequestException } from '@nestjs/common';
import {
  constants,
  createCipheriv,
  createDecipheriv,
  publicEncrypt,
  scrypt,
} from 'crypto';
import { readFileSync } from 'fs';
import { $enum } from 'ts-enum-util';
import { promisify } from 'util';

import {
  BUFFER_ENCODING_BASE_64,
  BUFFER_ENCODING_HEX,
  Constants,
  RSA_DECRYPT_OAEP_SHA256,
  UTF8,
} from '../common/constants';
import { PaginationMetaDto } from '../common/pagination/pagination.meta.dto';
import { ErrorCodes } from '../enums/error-codes';

const IV = async () =>
  (await promisify(scrypt)(
    process.env.IV,
    Constants.SALT,
    Constants.ARRAY_BUFFER_SIXTEEN,
  )) as Buffer;
const ENC_KEY = async () =>
  (await promisify(scrypt)(
    process.env.ENC_KEY,
    Constants.SALT,
    Constants.ARRAY_BUFFER_THIRTY_TWO,
  )) as Buffer;

export async function encrypt(textToEncrypt) {
  const cipher = createCipheriv(
    Constants.AES_ALGORITHM,
    Buffer.from(await ENC_KEY()),
    await IV(),
  );
  const encryptText = Buffer.concat([
    cipher.update(textToEncrypt),
    cipher.final(),
  ]);
  return encryptText.toString(BUFFER_ENCODING_HEX);
}

export async function decrypt(textToDecrypt) {
  const decryptBuffer = Buffer.from(textToDecrypt, BUFFER_ENCODING_HEX);
  const decipher = createDecipheriv(
    Constants.AES_ALGORITHM,
    Buffer.from(await ENC_KEY()),
    await IV(),
  );
  const decryptedText = Buffer.concat([
    decipher.update(decryptBuffer),
    decipher.final(),
  ]);

  return decryptedText.toString();
}

export function publicEncryptData(data: string, path: string): string {
  const publicKey = readFileSync(path, UTF8).trim();
  const encryptedData = publicEncrypt(
    {
      key: publicKey,
      padding: constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: RSA_DECRYPT_OAEP_SHA256,
    },
    Buffer.from(data),
  );
  return encryptedData.toString(BUFFER_ENCODING_BASE_64);
}

export function convertMS(milliSeconds) {
  let hour, minute, seconds;
  seconds = Math.floor(milliSeconds / Constants.MILLISECONDS);
  minute = Math.floor(seconds / Constants.SECONDS_IN_MINUTES);
  seconds = seconds % Constants.SECONDS_IN_MINUTES;
  hour = Math.floor(minute / Constants.MINUTES_IN_HOUR);
  minute = minute % Constants.MINUTES_IN_HOUR;
  const day = Math.floor(hour / Constants.HOUR_OF_DAY);
  hour = hour % Constants.HOUR_OF_DAY;
  return {
    day,
    hour,
    minute,
    seconds,
  };
}

export const searchParam = (string) => {
  const searchString = string ? string : Constants.EMPTY;
  return Constants.PERCENT.concat(searchString).concat(Constants.PERCENT);
};

export const searchFromLeftParam = (string) => {
  const searchString = string ? string : Constants.EMPTY;
  return searchString.concat(Constants.PERCENT);
};

export function checkDuplicate(arr: Array<string>) {
  const set = new Set(arr);
  // true if has duplicate elements
  return arr.length !== set.size;
}

export const listToHierarchy = (items, id = null, link = Constants.PARENT_ID) =>
  items
    .filter((item) => item[link] === id)
    .map((item) => ({ ...item, children: listToHierarchy(items, item.id) }));

export function traceLog(errMsg, sql = null, logger = null) {
  logger.error(`Error happen during query: ${sql}`);
  logger.error(errMsg);
}

export const buildTree = (data, ids, parentId = null, key: string) => {
  data.forEach((f) => {
    f[key] = data.filter((g) => {
      if (g.parentId === f.id) {
        ids.push(g.id);
        return true;
      }
    });
  });

  return data.filter((f) => {
    if (f.parentId === parentId) {
      ids.push(f.id);
      return true;
    }
  });
};

export function formatPaginationResponse(
  page,
  limit,
  data: any[],
): [any[], PaginationMetaDto] {
  limit = +limit ? +limit : 10;
  page = +page ? +page : 0;
  let start: number;
  let end: number;
  if (page - 1 <= 0) {
    start = 0;
    end = limit;
  } else {
    start = (page - 1) * limit;
    end = page * limit;
  }

  const totalItems = data.length;
  const data4CurrentPage = data.slice(start, end);
  const itemCount = data4CurrentPage.length; // item counted on a page
  const itemsPerPage = limit;
  const total = Math.round(totalItems / limit);
  const totalPages = Math.max(1, total);
  const currentPage = page;
  return [
    data4CurrentPage,
    { itemCount, totalItems, itemsPerPage, totalPages, currentPage },
  ];
}

export function getTime(date?: Date) {
  return date && date !== null ? date.getTime() : 0;
}

const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(pdf|xlsx|xls|txt|csv|doc|docx)$/)) {
    return callback(
      new BadRequestException(
        $enum(ErrorCodes).getKeyOrDefault(
          ErrorCodes.UNSUPPORTED_FILE_TYPE_ERROR,
        ),
      ),
      true,
    );
  }
  callback(null, true);
};

export const multerOptions = {
  // limit fileSize: 200 MB
  // limit fileName: 250 Bytes
  limits: { fileSize: 1024 * 1024 * 200, fieldNameSize: 250 },
  fileFilter: imageFileFilter,
};

// limit file upload number: 5 files
export const maxCount = 5;
