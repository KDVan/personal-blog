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
 *                                    - Class: request.interceptor.ts
 *                                    - Created by: Duy Kh. Van Ba
 *                                    - Created date: 06 Mar, 2022
 *
 **********************************************************************************************************************/

import { AsyncContext } from '@nestjs-steroids/async-context';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import RequestWithUser from '../interfaces/request-with-user';

@Injectable()
export class RequestInterceptor implements NestInterceptor {
  constructor(private readonly asyncHook: AsyncContext<string, string>) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.asyncHook.register(); // <-- Register async context
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<RequestWithUser>();
    this.asyncHook.set('userId', request.user.id); // <-- Define userId
    this.asyncHook.set('email', request.user.email); // <-- Define email
    return next.handle();
  }
}
