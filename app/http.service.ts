import { Injectable, Inject, forwardRef } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { SktnAuthService } from './auth.service';
import { Observable } from 'rxjs';
import { 
  ISktnResponse, 
  SktnMessageService
} from 'pangular';


@Injectable()
export class SktnHttpHelperService {

  headers = {
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }

  getResponse(result: any): Observable<ISktnResponse> {
    return Observable.of({
      status: true,
      result: result
    })
  }

  handleError(error: Response): Observable<ISktnResponse> { 
    
    let response:ISktnResponse = error.json();
    return Observable.throw(response);

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

}