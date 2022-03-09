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
 *                                  - Class: main.ts                                                                  *
 *                                  - Created by: Duy Kh. Van Ba                                                      *
 *                                  - Created date: Wednesday, Mar 9 2022                                             *
 *                                                                                                                    *
 **********************************************************************************************************************/

import { ClassSerializerInterceptor } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { GlobalExceptionsFilter } from './helpers/global-exception-filter';
import { ValidationPipe } from './validation/validation.pipe';
import { Constants, LOG_LEVEL_DEV, LOG_LEVEL_PROD } from './common/constants';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/role.guard';
import { PermissionGuard } from './auth/guards/permission.guard';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);

  const profile = configService.get('PROFILE_ENV');
  app.useLogger(
    profile === Constants.PROFILE_DEV_CONST ? LOG_LEVEL_DEV : LOG_LEVEL_PROD,
  );

  /* Config swagger */

  const config = new DocumentBuilder()
    .setTitle('KDVan Personal Blog APIs')
    .setDescription('This is the KDVan blog APIs document')
    .setVersion('1.0')
    .setLicense(
      'This project belong to Duy Kh. Van Ba',
      'https://blog.hexon.systems',
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: Constants.AUTH_BEARER_CONST,
        bearerFormat: Constants.AUTH_JWT_CONST,
      },
      Constants.AUTH_ACCESS_TOKEN_CONST,
    )

    /*.addServer(Constants.SERVER_PREFIX)*/

    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  /* End config swagger */

  const corsConf = {
    origin: Constants.CORS_ORIGIN_CONST,
    methods: Constants.CORS_METHODS_C0NST,
    preflightContinue: true,
    optionsSuccessStatus: 204,
    credentials: true,
  };

  app.enableCors(corsConf);

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)));
  app.useGlobalGuards(new RolesGuard(app.get(Reflector)));
  app.useGlobalGuards(new PermissionGuard(app.get(Reflector)));
  app.useGlobalFilters(new GlobalExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT_ENV);
  console.warn(
    `\n\t=========================== Server is up on port ${process.env.PORT_ENV}! ===========================\n`,
  );
}

bootstrap().then();
