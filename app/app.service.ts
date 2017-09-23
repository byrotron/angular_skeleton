import { Injectable } from '@angular/core'
import { Response } from '@angular/http';

import { Observable } from 'rxjs';

@Injectable()
export class SktnAppService {

  connection: Observable<boolean>;
  connected: boolean;
  connection_attempt: number = 0;
  
  constructor() {
    this.connection = Observable.merge(
      Observable.of(navigator.onLine),
      Observable.fromEvent(window, 'online').map(() => true),
      Observable.fromEvent(window, 'offline').map(() => false));
  }
  
  reconnect(response: Observable<Response>) {
    return response.delay(5000)

      //If it looks like an internet connection the request
      .scan((err_count: number, err: any) => {
        
        if(err.status === 0) { // This will confirm that the request failed completely
          if(err_count > 2) {
              throw err;
          }
        } else if(err.status === 500) { // Retry once if failed due to server error
          if(err_count > 0) {
              throw err;
          }
        } else { // Any other http status codes eg(401 / 404) just throw the error
          throw err;
        }

        this.connection_attempt++;
        return err_count + 1;

      }, 0);
  }

  

}