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
 *                                    - Class: validation.pipe.ts
 *                                    - Created by: Duy Kh. Van Ba
 *                                    - Created date: 07 Mar, 2022
 *
 **********************************************************************************************************************/

import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ErrorModel } from '../common/error.model';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !ValidationPipe.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const errorList = [];
      errors.forEach((error) => {
        let errorMessage = 'Validation failed';
        if (error.constraints && Object.values(error.constraints).length > 0) {
          errorMessage = Object.values(error.constraints)[0];
        }

        const errorModel = new ErrorModel(error.property, errorMessage);
        errorList.push(errorModel);
      });

      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: errorList,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }

  private static toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
