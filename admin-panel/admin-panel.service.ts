import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { ISktnSidenav, SktnSidenavService } from './../sidenav';
import { ISktnResponse } from './../interfaces/interfaces';
import { SktnMessageService } from './../messages';
import { Observable, Observer, BehaviorSubject } from 'rxjs';

import { SktnSidenavComponent } from './../sidenav';
import { SktnActionBarComponent } from './../action-bar';
import { SktnBreadcrumbsComponent } from './../breadcrumbs';

@Injectable()
export class SktnAdminPanelService {

  loading_message: string;
  loading: 'hide' | 'show' = 'show';

  left_nav: SktnSidenavComponent;
  right_nav: SktnSidenavComponent;
  action_bar: SktnActionBarComponent;
  breadcrumbs: SktnBreadcrumbsComponent;

  constructor(
    public sidenav: SktnSidenavService,
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

  handleError(error: Response) {

      let title: string;
      let type: 'error' | 'success' | 'info' | 'warn' = 'error';

      switch(error.status) {
        case 401: 
            title = 'Not Authenticated';
          break;
        case 403:
            title = 'Not Authorised';
          break;
        case 404: 
            title = 'Not Found';
          break;
        case 500: 
            title = 'Server Error';
          break;
        case 504: 
            title = 'Connection Error';
          break;
      }

      let body:ISktnResponse = error.json();

      this.addAdminMessage(type, title, body.message);
      return Observable.throw(error);

    }

}