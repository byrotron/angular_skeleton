import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { ISktnSidenav } from './../sidenav';
import { ISktnResponse } from './../interfaces/interfaces';
import { SktnMessageService } from './../messages';
import { Observable, Observer, BehaviorSubject } from 'rxjs';

import { SktnSidenavComponent } from './../sidenav';
import { SktnActionBarComponent } from './../action-bar';
import { SktnBreadcrumbsComponent } from './../breadcrumbs';
import { SktnAuthService } from './../app';

@Injectable()
export class SktnAdminPanelService {

  loading_message: string;
  loading: 'hide' | 'show' = 'show';

  left_nav: SktnSidenavComponent;
  right_nav: SktnSidenavComponent;
  action_bar: SktnActionBarComponent;
  breadcrumbs: SktnBreadcrumbsComponent;

  error: {
    type: string,
    message?: string
  };

  constructor(
    public messages: SktnMessageService,
    public auth: SktnAuthService
  ){}

  startLoading() {
    
    if(this.loading === 'hide') {
      
      setTimeout(() => {
        this.endError();
      }, 1);
      
      this.loading = 'show';
    }
  }

  stopLoading() {
    if(this.loading === 'show') {
      this.loading = 'hide';
      this.loading_message = undefined;
    }
  }

  startError(type: string, message?:string) {
    
    this.error ={
      type: type,
      message: message
    };

    this.stopLoading();

  }

  endError() {
    this.error = undefined;
  }

  addAdminMessage(type: 'error' | 'success' | 'info' | 'warn', title:string, message: string) {

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