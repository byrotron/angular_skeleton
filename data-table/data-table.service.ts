import { Injectable } from '@angular/core';
import { ISktnDataTableEvent } from './interfaces'
;
@Injectable()
export class SktnDataTableService {

  event: ISktnDataTableEvent;

  setEvent(event: ISktnDataTableEvent, force: boolean = false) {

    if(!this.event) {
      this.event = event;
    }

    if(force === true) {
      this.event = event;
    }

  }

}