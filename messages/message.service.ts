import { Injectable } from '@angular/core';
import { ISktnMessage } from './interfaces';

@Injectable()
export class SktnMessageService {

  messages: ISktnMessage[] = [];

  addSuccessfulMessage(title: string, message: string) {
    this.messages.unshift({
      title: title,
      message: message,
      type: 'success'
    });
  }

  addErrorMessage(title: string, message: string) {
    this.messages.unshift({
      title: title,
      message: message,
      type: 'error'
    });
  }

  addWarningMessage(title: string, message: string) {
    this.messages.unshift({
      title: title,
      message: message,
      type: 'warning'
    });
  }

  addInfoMessage(title: string, message: string) {
    this.messages.unshift({
      title: title,
      message: message,
      type: 'info'
    });
  }

  removeMessage(message: ISktnMessage) {
    this.messages = this.messages.filter((val: ISktnMessage) => {
      return message.title !== val.title && message.message !== val.message
    });
  }

}
