import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild }    from '@angular/router';

import { Observable, Observer} from 'rxjs';

import { SktnAuthService,  } from './../app';
import { ISktnResponse } from './../interfaces/interfaces'

@Injectable()
export class SktnAuthGuard implements CanActivate, CanActivateChild {

  constructor(
    protected router: Router,
    protected auth: SktnAuthService
  ){}

  isAuthenticated(): Observable<boolean> {
    
    return Observable.create((obs: Observer<boolean>) => {
      this.auth.isAuthenticated().subscribe(
        (response: ISktnResponse) => {
          if(response.result) {

            this.auth.current_user = response.result.user;
            this.auth.privileges = response.result.privileges;
            obs.next(true);
           
          } else {

            this.auth.current_user = undefined;
            this.router.navigate(['/sign-in']);
            obs.next(false);

          }

          obs.complete();
        }
      )
    });
    
  }

  canActivateChild(): Observable<boolean> {
      return this.isAuthenticated();
  }

  canActivate(): Observable<boolean> {
      return this.isAuthenticated();
  }
}