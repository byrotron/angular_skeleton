import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs';

import { SktnAdminPanelService } from './../admin-panel/admin-panel.service';
import { SktnHttpHelperService } from './../app';
import { ISktnResponse } from './../interfaces/interfaces';

@Injectable()
export class SktnPrivilegesService {

  headers = new Headers({
    'Content-Type': 'application/json'
  });

  options = new RequestOptions({ headers: this.headers });

  constructor(
    protected http: Http,
    protected helper: SktnHttpHelperService

  ) {}

  getPrivileges() {

    return this.http.get('/api/privileges/view-privileges', this.options)
    .map((response: Response) => {
      return response.json() as ISktnResponse
    })
    .retryWhen((request: Observable<Response>) => {
      return this.helper.reconnect(request);
    })
    .catch((err: Response) => {
      return this.helper.handleError(err);
    });

  }

  updatePrivilege(action: number, role: number, status: boolean) {

    return this.http.put('/api/privileges/update-privilege', {
      action: action,
      role: role,
      status: status 
    }, this.options)
    .map((response: Response) => {
      return response.json() as ISktnResponse
    })
    .retryWhen((request: Observable<Response>) => {
      return this.helper.reconnect(request);
    })
    .catch((err: Response) => {
      return this.helper.handleError(err);
    });

  }

}