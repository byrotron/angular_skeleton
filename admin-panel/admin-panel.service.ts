import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { ISktnSidenav, SktnSidenavService } from './../sidenav';
import { ISktnResponse } from './../interfaces/interfaces';
import { SktnMessageService } from './../messages';
import { Observable, Observer, BehaviorSubject } from 'rxjs';


@Injectable()
export class SktnAdminPanelService {

  loading_message: string;
  loading: 'hide' | 'show' = 'show';
  toggle_sidenav: 'hide' | 'show' = 'show';

  constructor(
    public sidenav: SktnSidenavService,
    public messages: SktnMessageService
  ){}

 
  toggleSidenav() {
    if(this.toggle_sidenav === 'show') {
      this.toggle_sidenav = 'hide';
    } else if(this.toggle_sidenav === 'hide') {
      this.toggle_sidenav = 'show';
    }
  }

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