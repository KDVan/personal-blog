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
 *                                    - Class: pagination.meta.dto.ts
 *                                    - Created by: Duy Kh. Van Ba
 *                                    - Created date: 05 Mar, 2022
 *
 **********************************************************************************************************************/

import { ApiProperty } from '@nestjs/swagger';

export class PaginationMetaDto {
  @ApiProperty()
  public currentPage: number;

  @ApiProperty()
  public itemCount: number;

  @ApiProperty()
  public itemsPerPage: number;

  @ApiProperty()
  public totalItems: number;

  @ApiProperty()
  public totalPages: number;

  constructor(
    currentPage: number,
    itemCount: number,
    itemsPerPage: number,
    totalItems: number,
    totalPages: number,
  ) {
    this.currentPage = currentPage;
    this.itemCount = itemCount;
    this.itemsPerPage = itemsPerPage;
    this.totalItems = totalItems;
    this.totalPages = totalPages;
  }
}
