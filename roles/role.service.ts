import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs';

import { SktnAppService, SktnAuthService } from './../app';
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

  headers = new Headers({
    'Content-Type': 'application/json'
  });

  options = new RequestOptions({ headers: this.headers });

  constructor(
    protected http: Http,
    protected app: SktnAppService,
    public admin: SktnAdminPanelService,
    protected auth: SktnAuthService
  ) { }

  getRoles() {

    return this.http.get('/api/roles/view-roles', this.options)
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

  createRole(name: string) {
    return this.http.post('/api/roles/create-role', {
      name: name
    }, this.options)
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

  updateRole(id: number, name: string) {

    return this.http.post('/api/roles/update-role', {
      id: id,
      name: name
    }, this.options)
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

  deleteRole(id: number) {

    return this.http.post('/api/roles/delete-role', {
      id: id,
    }, this.options)
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

  setPrivileges() {
    // Set the privileges
    this.actions.create = this.auth.validateAction('create_user_action');
    this.actions.update = this.auth.validateAction('update_user_action');
    this.actions.delete = this.auth.validateAction('delete_user_action');
  }

}