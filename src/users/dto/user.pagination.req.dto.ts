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
 *                                    - Created by: Duy Kh. Van Ba
 *                                    - Created date: 05 Mar, 2022
 *
 **********************************************************************************************************************/

import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from '../../common/pagination/pagination.dto';

export class UserPaginationReqDto extends PaginationDto {
  @ApiProperty({ required: false })
  public email: string;

  constructor(page: number, limit: number, email: string) {
    super(page, limit);
    this.email = email;
  }
}
