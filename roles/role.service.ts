import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs';

import { SktnHttpHelperService } from './../app';
import { ISktnResponse  } from './../interfaces/interfaces';
import { SktnAdminPanelService } from './../admin-panel';
import { ISktnRole } from './interfaces';

@Injectable()
export class SktnRoleService {

  loader: 'hide' | 'show' = 'hide';

  roles: ISktnRole[] = [];

  current_role: ISktnRole;

  actions = {
    create: false,
    update: false,
    delete: false
  }

  constructor(
    protected http: Http,
    protected helper: SktnHttpHelperService
  ) { }

  getRoles() {

    let options = new RequestOptions(this.helper.headers);
    return this.http.get('/api/roles/view-roles', options)
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

  createRole(name: string) {

    let options = new RequestOptions(this.helper.headers);
    return this.http.post('/api/roles/create-role', {
      name: name
    }, options)
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

  updateRole(id: number, name: string) {

    let options = new RequestOptions(this.helper.headers);
    return this.http.post('/api/roles/update-role', {
      id: id,
      name: name
    }, options)
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

  deleteRole(id: number) {

    let options = new RequestOptions(this.helper.headers);
    return this.http.post('/api/roles/delete-role', {
      id: id,
    }, options)
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

  setPrivileges() {

    // Set the privileges
    this.actions = this.helper.validateActions({
      create: 'create_role_action',
      update: 'update_role_action',
      delete: 'delete_role_action'
    });
    
  }

}