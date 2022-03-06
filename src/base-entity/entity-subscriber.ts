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
 *                                    - Class: entity-subscriber.ts
 *                                    - Created by: Duy Kh. Van Ba
 *                                    - Created date: 05 Mar, 2022
 *
 **********************************************************************************************************************/

import { Logger } from '@nestjs/common';
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm';

@EventSubscriber()
export class EntitySubscriber implements EntitySubscriberInterface {
  private logger = new Logger(EntitySubscriber.name);
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }
  /**
   * Called before post insertion.
   */
  beforeInsert(event: InsertEvent<any>) {
    this.logger.debug('Insert data for created_date and active column');
    event.entity.setUpdatedDate = new Date();
    event.entity.setActive = true;
  }

  /**
   * Called before entity update.
   */
  beforeUpdate(event: UpdateEvent<any>) {
    event.entity.setUpdatedDate = new Date();
  }

  /**
   * Called before entity removal.
   */
  beforeRemove(event: RemoveEvent<any>) {
    event.entity.setDeletedDate = new Date();
  }
}
