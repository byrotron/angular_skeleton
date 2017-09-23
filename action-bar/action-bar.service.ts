import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Observer, BehaviorSubject } from 'rxjs';

@Injectable()
export class SktnActionBarService {

  show: 'hide' | 'show' = 'hide';
  component = new BehaviorSubject<any>(null);

  activateBar(component: any, data: any = null) {
    let inject_component: any = {
      component: component
    }
    if(data) {
      inject_component.data = data;
    }
    this.component.next(inject_component);

  }

}