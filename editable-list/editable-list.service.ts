import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response, URLSearchParams } from '@angular/http';
import { ISktnResponse } from './../interfaces/interfaces';
import { ISktnEditableList, ISktnEditableListItem } from './interfaces';
import { Observable, Observer, BehaviorSubject } from 'rxjs';

@Injectable()
export class SktnEditableListService {

  editing:boolean = false;

  errors: Error[] = [];

  lists: ISktnEditableList[] = [];

  loading = true;

  headers = new Headers({
    'Content-Type': 'application/json'
  });

  options = new RequestOptions({ headers: this.headers });

  test_request: Observable<any>;

  requests: ISktnEditableList[] = [];

  constructor(
    public http: Http,
  ) {}

  handleError(response: Response) {
    let title: string;
    this.errors = [];
    this.errors.push(new Error(response.json().message));

    return Observable.throw(response);
  }

  hasListBeenRequested(group: string, name: string) {
    
    return this.requests.findIndex((request: any) => {
      if(request.group === group && request.name === name) {
        return true;
      } else {
        return false;
      }
    });

  }

  getListRequest(group: string, name: string) {

    let params: URLSearchParams = new URLSearchParams();
    params.set('group', group);
    params.set('list', name);
    this.options.params = params;

    return this.http.get('/api/editable-lists/get-list', this.options)
    .map((response: Response) => {
      return response.json() as ISktnResponse
    })
    .catch((response: Response) => {
      return this.handleError(response);
    })
    
  }

  requestStillPending() {
    
    let pending = this.lists.findIndex((list: ISktnEditableList) => {
      return list.status === 'requesting';
    });

    return pending >= 0 ? true : false;
  }

  // This is a monster, basically only requests a list once another request is finished
  // But if the request is finished and the another request comes through for the same
  // list it will wait until that list is finished and then return the alreayd completed list
  getList(group: string, name: string) {
    
    // Set the list if it has not already been set
    if(this.listExists(group, name) === false) {  
      this.lists.push({
        name: name,
        group: {
          name: group
        },
        status: 'waiting',
        items: []
      });

      return Observable.create((obs: Observer<ISktnEditableList[]>) => {

        if(!this.requestStillPending()) {

          let ind = this.findListIndex(group, name);
          this.lists[ind].status = 'requesting';

          this.getListRequest(group, name).subscribe(
            (response: ISktnResponse) => {
              this.lists[ind].status = 'complete';
              this.lists[ind].items = response.result.items;
              this.lists[ind].id = response.result.id;
              obs.next(this.lists);
            }
          );

        } else {
          obs.error(new Error());
        }
      })
      .retryWhen((error: Observable<Error>) => {
          return error.delay(200);
        });
    } else  {

      // Observable to delay for a second
      let ind = this.findListIndex(group, name);
      // Here we will delay the observable
      return Observable.create((obs: Observer<ISktnEditableList[]>) => {
        if(this.lists[ind].status === 'requesting') {
          obs.error(new Error("AAARG"));
        } else {
          obs.next(this.lists);
        }
      })
      .retryWhen((error: Observable<Error>) => {
        return error.delay(200);
      });

    }

  }

  create(id: number, name: string, group: string, item: ISktnEditableListItem) {
    let options = new RequestOptions({ headers: this.headers });
    return this.http.post('/api/editable-lists/add-list-item', {
      id: id,
      name: name,
      group: group,
      item: item
    }, options)
    .map((response: Response) => {
      return response.json() as ISktnResponse
    })
    .catch((response: Response) => {
      return this.handleError(response);
    });
    
  }

  update(item: ISktnEditableListItem) {
    let options = new RequestOptions({ headers: this.headers });
    return this.http.put('/api/editable-lists/edit-list-item', {
      id: item.id,
      data: item 
    }, options)
    .map((response: Response) => {
      return response.json() as ISktnResponse
    })
    .catch((err: Response) => {
      return this.handleError(err);
    });
    
  }

  // Only insert the list if it does not exist
  updateList(list: ISktnEditableList) {
    // if(this.listExists(list.group.name, list.name) === false) {
    //   this.lists.push(list);
    // }
  }

  // Check to see if the list actualy
  listExists(group: string, name: string) {

    let result = this.lists.findIndex((list: any) => {
      return list.group.name === group && list.name === name;
    });

    if(result >= 0) {
      return true;
    } else {
      return false;
    }
  }

  // Return the list if it exists
  findListIndex(group: string, name: string) {

    return this.lists.findIndex((list: any) => {
      return list.group.name === group && list.name === name;
    });

  }

}
