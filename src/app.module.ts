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
 *                                  - Class: app.module.ts                                                            *
 *                                  - Created by: Duy Kh. Van Ba                                                      *
 *                                  - Created date: Wednesday, Mar 9 2022                                             *
 *                                                                                                                    *
 **********************************************************************************************************************/

import { ClassSerializerInterceptor, Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AsyncContextModule } from '@nestjs-steroids/async-context';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { EntitySubscriber } from './base-entity/entity-subscriber';
import { GlobalExceptionsFilter } from './helpers/global-exception-filter';
import { UsersModule } from './users/users.module';
import { AutomapperModule } from 'nestjsx-automapper';
import { MailModule } from './mail/mail.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import * as Joi from '@hapi/joi';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { RequestInterceptor } from './intercrptors/request.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 100,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'mail/templates'),
    }),
    AutomapperModule.withMapper(),
    AsyncContextModule.forRoot(),
    UsersModule,
    MailModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string(),
        PORT_ENV: Joi.number(),
        JWT_EXP: Joi.number(),
        JWT_SECRET: Joi.string(),
      }),
    }),
    TokenModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionsFilter,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    EntitySubscriber,
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestInterceptor,
    },
    {
      provide: Logger,
      useValue: new Logger(),
    },
  ],
})
export class AppModule {}
