import { Injectable, Inject, forwardRef } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { 
  ISktnResponse, 
  SktnMessageService
} from 'pangular';

export class TestService {

}

@Injectable()
export class SktnHttpHelperService {

  headers = {
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }

  handleError(error: Response): Observable<ISktnResponse> { 
    
    let body:ISktnResponse = error.json();

    body.status = false;
    body.message = "Fatal Error: There seems to have been an issue with your request";

    return Observable.throw(body); 

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

        return err_count + 1; 

      }, 0); 
  } 

  validateActions(actions: any) {

    let updated_actions = [];

    for(let action in actions) {

      updated_actions[action] = true

    }

    return updated_actions;
  }

}