import { Injectable } from '@angular/core';
import { ISktnDataTableEvent } from './interfaces'
;
@Injectable()
export class SktnDataTableService {

  table_name: string;
  event: ISktnDataTableEvent;

  setEvent(table_name: string, event: ISktnDataTableEvent, force: boolean = false) {

    if(!this.event || this.table_name != table_name) {
      this.event = event;
      this.table_name = table_name;
    }

    if(force === true) {
      this.event = event;
      this.table_name = table_name;
    }

  }

}