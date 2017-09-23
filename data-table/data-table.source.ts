
import { Observable, BehaviorSubject } from 'rxjs';

export class SktnDataTableSource {

  rows: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor() { }

  connect(): Observable<string[]> {
    return this.rows;
  }

  disconnect() {}
}