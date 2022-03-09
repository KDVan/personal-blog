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
 *                                  - Class: auth.controller.ts                                                       *
 *                                  - Created by: Duy Kh. Van Ba                                                      *
 *                                  - Created date: Wednesday, Mar 9 2022                                             *
 *                                                                                                                    *
 **********************************************************************************************************************/

import {
  Body,
  Controller,
  Get,
  HttpCode,
  Logger,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { $enum } from 'ts-enum-util';

import { Constants } from '../common/constants';
import { Anonymous } from '../decorators/anonymous.decorator';
import { ErrorCodes } from '../enums/error-codes';
import { UserDetailDto } from '../users/dto/user.detail.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { TokenReq } from './dto/token.req';
import { TokenResDto } from './dto/token.res';
import { LocalGuard } from './guards/local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @ApiUnauthorizedResponse({
    description: $enum(ErrorCodes).getKeyOrDefault(
      ErrorCodes.AUTH_UNAUTHORIZED_ERROR,
    ),
  })
  @ApiNotFoundResponse({
    description: $enum(ErrorCodes).getKeyOrDefault(
      ErrorCodes.USER_NOT_EXIST_ERROR,
    ),
  })
  @HttpCode(200)
  @ApiOkResponse({ type: TokenResDto })
  @Anonymous()
  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Body() loginInf: LoginDto): Promise<TokenResDto> {
    this.logger.log(`REST request to login with email ${loginInf.username}`);
    return this.authService.login(loginInf);
  }

  @ApiOkResponse({ type: UserDetailDto })
  @ApiBearerAuth(Constants.AUTH_ACCESS_TOKEN_CONST)
  @ApiNotAcceptableResponse({
    description: $enum(ErrorCodes).getKeyOrDefault(
      ErrorCodes.TOKEN_EXPIRED_ERROR,
    ),
  })
  @Get('authenticate')
  async authenticate(@Request() req): Promise<UserDetailDto> {
    this.logger.log(`REST request to authenticate token ${req.user.email}`);
    return req.user;
  }

  @ApiNotAcceptableResponse({
    description: $enum(ErrorCodes).getKeyOrDefault(
      ErrorCodes.REFRESH_TOKEN_EXPIRED_ERROR,
    ),
  })
  @ApiUnauthorizedResponse({
    description: $enum(ErrorCodes).getKeyOrDefault(
      ErrorCodes.AUTH_UNAUTHORIZED_ERROR,
    ),
  })
  @HttpCode(200)
  @ApiOkResponse({ type: TokenResDto })
  @Anonymous()
  @Post('refresh-token')
  async token(@Body() tokenReq: TokenReq): Promise<TokenResDto> {
    this.logger.log(
      `REST request to create new token by refresh token: ${tokenReq.refreshToken}`,
    );
    return this.authService.getAccessTokenFromRefreshToken(
      tokenReq.refreshToken,
    );
  }

  @ApiBearerAuth(Constants.AUTH_ACCESS_TOKEN_CONST)
  @ApiOkResponse({ description: Constants.SUCCESS_CONST })
  @HttpCode(200)
  @Post('logout')
  async logout(@Req() req): Promise<string> {
    this.logger.log(`Logout for user ${req.user.id}`);
    await this.authService.logout(req.user.id);
    return Constants.SUCCESS_CONST;
  }
}
