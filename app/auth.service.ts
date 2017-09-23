import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { ISktnResponse, ISktnUser, ISktnPrivilege, ISktnAction } from './../';

import{ Observable } from 'rxjs';

@Injectable()
export class SktnAuthService {
  
  current_user: ISktnUser;
  privileges: ISktnPrivilege[] = [];

  headers = new Headers({
    'Content-Type': 'application/json'
  });

  options = new RequestOptions({ headers: this.headers });

  constructor(
    public http: Http,
    public router: Router,
  ){}

  login(email: string, password: string): Observable<ISktnResponse> {

    return this.http.post('/api/auth/login', {
      email: email,
      password: password
    }, this.options)
    .map((response: Response) => {
      return response.json() as ISktnResponse;
    })
    .catch((err: any) => {
      let body:ISktnResponse = err.json();

      return Observable.of<ISktnResponse>(body);
    });

  }

  validateAction(privilege_name: string) {

    if(this.current_user.role.id != 1) {
      if(this.privileges.length > 0) {
        let privilege: ISktnPrivilege = this.privileges.find((val: ISktnAction & ISktnPrivilege) => {
          return val.action == privilege_name;
        });

        if(privilege) {
          return privilege.status;
        } else {
          return false;
        }
        

      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  logout() {

    return this.http.get('/api/auth/logout', this.options)
    .map((response: Response) => {
      return response.json() as ISktnResponse;
    })
    .catch((err: any) => {
      let body:ISktnResponse = err.json();

      return Observable.of<ISktnResponse>(body);
    });
  }

  signup(email: string, password: string) {
    
    return this.http.post('/api/auth/sign-up', {
      email: email,
      password: password
    }, this.options)
    .map((response: Response) => {
      return response.json() as ISktnResponse;
    });

  }

  isAuthenticated(): Observable<ISktnResponse> {

    return this.http.get('/api/auth/is_authd', this.options)
    .map((response: Response) => {
      return response.json() as ISktnResponse;
    })
    .catch((err: any) => {
      let body:ISktnResponse = err.json();

      return Observable.of<ISktnResponse>(body);
    });

  }

}