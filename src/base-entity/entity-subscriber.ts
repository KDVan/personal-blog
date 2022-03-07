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

import { AsyncContext } from '@nestjs-steroids/async-context';
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';

@EventSubscriber()
export class EntitySubscriber implements EntitySubscriberInterface {
  constructor(
    connection: Connection,
    private readonly asyncContext: AsyncContext<string, string>,
  ) {
    connection.subscribers.push(this);
  }

  /**
   * Called before post insertion.
   */

  beforeInsert(event: InsertEvent<any>) {
    event.entity.createdDate = new Date();
    event.entity.active = true;
    this.asyncContext.register();
    event.entity.createdBy = this.asyncContext.get('email');
  }

  /**
   * Called before entity update.
   */

  beforeUpdate(event: UpdateEvent<any>) {
    this.asyncContext.register();
    if (event.entity.active === true) {
      event.entity.updatedDate = new Date();
      event.entity.updatedBy = this.asyncContext.get('email');
    } else if (event.entity.email != null) {
      event.entity.updatedBy = this.asyncContext.get('email');
      event.entity.deletedBy = this.asyncContext.get('email');
    } else {
      event.entity.deletedDate = new Date();
      event.entity.deletedBy = this.asyncContext.get('email');
    }
  }
}
