import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs';

import { ISktnDataTableEvent } from './../data-table/interfaces';
import { SktnAdminPanelService } from './../admin-panel/admin-panel.service';
import { SktnHttpHelperService } from './../app';
import { ISktnResponse } from './../interfaces/interfaces';
import { ISktnUser } from './../users/interfaces';

@Injectable()
export class SktnUserService {
  
  loader: 'hide' | 'show' = 'hide';

  users: ISktnUser[] = [];

  current_user: ISktnUser;

  actions: any = {
    create: true,
    read: true,
    update: true,
    delete: true
  };

  constructor(
    public http: Http,
    protected helper: SktnHttpHelperService
  ) { }

  getUser(id: any) {

    let params: URLSearchParams = new URLSearchParams();
    let options = new RequestOptions( this.helper.headers );

    params.set('id', String(id));
    options.params = params;

    return this.http.get('/api/users/view-user', options)
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

  getUsers(event: ISktnDataTableEvent): Observable<ISktnResponse> {

    let params: URLSearchParams = new URLSearchParams();
    let options = new RequestOptions( this.helper.headers );

    params.set('page', String(event.page));
    params.set('limit', String(event.limit));
    params.set('orderby', event.orderby);
    params.set('direction', event.direction);
    
    if(event.filter) {
      params.set('filter', event.filter);
    }
    
    options.params = params;

    return this.http.get('/api/users/view-users', options)  
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

  create(user: ISktnUser) {
    
    if(this.actions.create === true) {
      let options = new RequestOptions( this.helper.headers );

      return this.http.post('/api/users/create-user', {
        user: user
      }, options)
      .map((response: Response) => {
        return response.json() as ISktnResponse
      })
      .retryWhen((request: Observable<Response>) => {
        return this.helper.reconnect(request);
      })
      .catch((err: any) => {
        return this.helper.handleError(err);
      });
    }
  }

  update(id: string | number, user: any) {
    
    if(this.actions.update === true) {

      let options = new RequestOptions( this.helper.headers );
      let params: URLSearchParams = new URLSearchParams();
      params.set('id', String(id));
      options.params = params;

      return this.http.put('/api/users/update-user', {
        user: user
      }, options)
      .map((response: Response) => {
        return response.json() as ISktnResponse
      })
      .retryWhen((request: Observable<Response>) => {
        return this.helper.reconnect(request);
      })
      .catch((err: any) => {
        return this.helper.handleError(err);
      });
    }
  }

  delete(id: number | string) {
    
    if(this.actions.delete) {

      let options = new RequestOptions( this.helper.headers );
      let params: URLSearchParams = new URLSearchParams();
      params.set('id', String(id));
      options.params = params;

      return this.http.delete('/api/users/delete-user', options)
        .map((response: Response) => {
          return response.json() as ISktnResponse
        })
        .retryWhen((request: Observable<Response>) => {
          return this.helper.reconnect(request);
        })
        .catch((err: any) => {
          return this.helper.handleError(err);
        });
    }

  }

  setPrivileges() {

    // Set the privileges
    this.actions = this.helper.validateActions({
      create: 'create_user_action',
      read: 'view_user_action',
      update: 'update_user_action',
      delete: 'delete_user_action'
    });
    
  }
}
