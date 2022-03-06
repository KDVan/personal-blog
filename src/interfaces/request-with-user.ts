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
 *                                    - Class: request-with-user.ts
 *                                    - Created by: Duy Kh. Van Ba
 *                                    - Created date: 06 Mar, 2022
 *
 **********************************************************************************************************************/

import { Request } from 'express';
import { User } from '../users/entity/user.entity';

interface RequestWithUser extends Request {
  user: User;
}

export default RequestWithUser;
