import { Injectable } from '@angular/core';

import * as moment from 'moment';

@Injectable()
export class SktnDateService {

  date: moment.Moment;

  constructor() {
    this.date = moment();
  }

  isValid(date: string, format: string) {
    return moment(date, format).isValid();
  }

  newDate(date: any, format?: string) {
    return moment(date, format);
  }
}