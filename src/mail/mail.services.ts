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
 *                                    - Class: mail.services.ts
 *                                    - Created by: Duy Kh. Van Ba
 *                                    - Created date: 05 Mar, 2022
 *
 **********************************************************************************************************************/

import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { EmailDto } from './dto/email.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private logger = new Logger(MailService.name);

  constructor(
    private mailerService: MailerService,
    private config: ConfigService,
  ) {}

  async sendMail(emailTemplateDto: EmailDto, data: any) {
    this.logger.log(__dirname);
    await this.mailerService.sendMail({
      to: emailTemplateDto.to,
      from: this.config.get('MAIL_FROM'),
      subject: emailTemplateDto.subject,

      // TODO: If not working change to absolute path

      template: `${__dirname}\\`.concat(emailTemplateDto.template),
      context: data,
    });
  }
}
