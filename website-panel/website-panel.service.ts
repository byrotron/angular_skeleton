import { Injectable } from '@angular/core';
import { SktnMessageService } from './../messages/message.service';

@Injectable()
export class SktnWebsitePanelService {

  loading: 'hide' | 'show' = 'hide';
  loading_message: string;

  constructor(
    public messages: SktnMessageService
  ){}

  startLoading() {
    if(this.loading === 'hide') {
      this.loading = 'show';
    }
  }

  stopLoading() {
    if(this.loading === 'show') {
        this.loading = 'hide';
    }
  }
  
  addMessage(type: 'error' | 'success' | 'info' | 'warn', title:string, message: string) {
    
    switch(type) {
      case "error": this.messages.addErrorMessage(title, message);
        break;
      case 'success': this.messages.addSuccessfulMessage(title, message);
        break;
      case 'warn': this.messages.addWarningMessage(title, message);
        break;
      case 'info': this.messages.addSuccessfulMessage(title, message);
        break;
    }

  }
  
} 