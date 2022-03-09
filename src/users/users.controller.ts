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
 *                                    - Class: users.controller.ts
 *                                    - Created by: Duy Kh. Van Ba
 *                                    - Created date: 05 Mar, 2022
 *
 **********************************************************************************************************************/

import { AutoMapper } from '@nartc/automapper';
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
  Req,
  Request,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { InjectMapper } from 'nestjsx-automapper';
import { Constants } from '../common/constants';
import { UserDetailReqDto } from './dto/user.detail.req.dto';
import { CommonResDto } from './dto/common.res.dto';
import { UserDetailDto } from './dto/user.detail.dto';
import { UserPaginationReqDto } from './dto/user.pagination.req.dto';
import { UsersService } from './users.service';
import { UpdateUserResDto } from './dto/update.user.res.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  private logger = new Logger(UsersController.name);

  constructor(
    private readonly usersService: UsersService,
    @InjectMapper() private readonly mapper: AutoMapper,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: UserDetailDto,
    description: 'The record has been successfully created.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  @ApiBearerAuth(Constants.AUTH_ACCESS_TOKEN_CONST)
  async create(@Req() req, @Body() accountDto: UserDetailReqDto) {
    this.logger.log(`REST request to create account ${accountDto.email}`);

    //TODO: Add authorization

    return this.usersService.create(accountDto, null);
  }

  @Get()
  @ApiOkResponse({
    schema: {
      allOf: [
        {
          properties: {
            items: {
              type: 'array',
              items: { $ref: getSchemaPath(UserDetailDto) },
            },
            meta: {
              properties: {
                currentPage: {
                  type: 'number',
                },
                itemCount: {
                  type: 'number',
                },
                itemsPerPage: {
                  type: 'number',
                },
                totalItems: {
                  type: 'number',
                },
                totalPages: {
                  type: 'number',
                },
              },
            },
          },
        },
      ],
    },
    description: 'The record has been successfully loaded.',
  })
  @ApiBearerAuth(Constants.AUTH_ACCESS_TOKEN_CONST)
  async getListUser(
    @Query()
    {
      page = Constants.DEFAULT_PAGE,
      limit = Constants.DEFAULT_LIMIT,
      email,
    }: UserPaginationReqDto,
  ) {
    this.logger.log('REST request to get list users');
    return this.usersService.getListUsers({ page, limit }, email);
  }

  @Put(':id')
  @ApiOkResponse({
    type: UserDetailDto,
    description: 'The record has been successfully updated.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  async update(
    @Param('id') id: string,
    @Body() updateUserResDto: UpdateUserResDto,
  ) {
    this.logger.log(
      `REST request to update user details: ${JSON.stringify(
        updateUserResDto,
      )}`,
    );
    return this.usersService.update(id, updateUserResDto);
  }

  @Delete()
  @ApiOkResponse({
    type: CommonResDto,
    description: 'The record has been successfully deleted.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  async deleteUserAccount(
    @Request() req,
    @Query('id') id: string,
  ): Promise<CommonResDto> {
    this.logger.log(`REST request to delete user account: #${id}`);

    //TODO: Add authorization

    await this.usersService.delete(id, null);
    return new CommonResDto(true);
  }
}
