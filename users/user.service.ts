import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs';

import { SktnAdminPanelService } from './../admin-panel/admin-panel.service';
import { SktnAuthService, SktnAppService } from './../app';
import { ISktnResponse } from './../interfaces/interfaces';
import { ISktnUser } from './../users/interfaces';

@Injectable()
export class SktnUserService {
  
  loader: 'hide' | 'show' = 'hide';

  users: ISktnUser[] = [];

  current_user: ISktnUser;

  actions = {
    create: false,
    read: false,
    update: false,
    delete: false
  }

  headers = new Headers({
    'Content-Type': 'application/json'
  });

  options = new RequestOptions({ headers: this.headers });

  constructor(
    public http: Http,
    public app: SktnAppService,
    public admin: SktnAdminPanelService,
    public auth: SktnAuthService
  ) { }

  getUser(id: any) {

    let params: URLSearchParams = new URLSearchParams();
    params.set('id', String(id));
    this.options.params = params;

    return this.http.get('/api/users/view-user', this.options)
    .map((response: Response) => {
      return response.json() as ISktnResponse
    })
    .retryWhen((request: Observable<Response>) => {
        return this.app.reconnect(request);
    })
    .catch((err: Response) => {
      return this.admin.handleError(err);
    });
    
  }

  getUsers(page: number, limit: number, order_by: string, order_style: string, filter?: string): Observable<ISktnResponse> {

    let params: URLSearchParams = new URLSearchParams();
    params.set('page', String(page));
    params.set('limit', String(limit));
    params.set('orderby', order_by);
    params.set('direction', order_style);
    
    if(filter) {
      params.set('filter', filter);
    }
    
    this.options.params = params;

    return this.http.get('/api/users/view-users', this.options)  
      .map((response: Response) => {
        return response.json() as ISktnResponse
      })
      .retryWhen((request: Observable<Response>) => {
        return this.app.reconnect(request);
      })
      .catch((err: Response) => {
        return this.admin.handleError(err);
      });

  }

  create(user: ISktnUser) {
    if(this.actions.create === true) {
      return this.http.post('/api/users/create-user', {
        user: user
      }, this.options)
      .map((response: Response) => {
        return response.json() as ISktnResponse
      })
      .catch((err: any) => {
        return this.admin.handleError(err);
      });
    }
  }

  update(id: string | number, user: any) {
    if(this.actions.update === true) {
      let params: URLSearchParams = new URLSearchParams();
      params.set('id', String(id));
      this.options.params = params;

      return this.http.put('/api/users/update-user', {
        user: user
      }, this.options)
      .map((response: Response) => {
        return response.json() as ISktnResponse
      })
      .catch((err: any) => {
        return this.admin.handleError(err);
      });
    }
  }

  delete(id: number | string) {
    
    if(this.actions.delete) {
      let params: URLSearchParams = new URLSearchParams();
      params.set('id', String(id));
      this.options.params = params;

      return this.http.delete('/api/users/delete-user', this.options)
        .map((response: Response) => {
          return response.json() as ISktnResponse
        })
        .catch((err: any) => {
          return this.admin.handleError(err);
        });
    }

  }

  setPrivileges() {

    // Set the privileges
    this.actions.create = this.auth.validateAction('create_user_action');
    this.actions.read = this.auth.validateAction('view_user_action');
    this.actions.update = this.auth.validateAction('update_user_action');
    this.actions.delete = this.auth.validateAction('delete_user_action');
    
  }
}
