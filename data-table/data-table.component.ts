import { 
  Component, 
  OnInit, 
  Input, 
  ViewChild, 
  ElementRef, 
  Output,
  ContentChild,
  EventEmitter,
  ViewEncapsulation } from '@angular/core';
import { MdSort, MdSortable } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { SktnPaginationComponent, ISktnPaginationEvent } from './../pagination';
import { ISktnDataTableEvent } from './interfaces';

@Component({
  selector: 'sktn-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: [
    './data-table.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class SktnDataTableComponent {

  @Input()
  pagination: boolean = true;

  @Input()
  filter: boolean = true;

  @Input()
  actions: boolean = true;

  @Input()
  page: number = 1;

  @Input()
  total_items: number = 0;
  
  @Input()
  limit: number = 50;
  
  @Input()
  orderby:string;

  @Input()
  direction: 'ASC' | 'DESC' = 'ASC';

  @Input()
  active: boolean = true;

  @ViewChild('filterinput') 
  protected _filter: ElementRef;

  @ViewChild(SktnPaginationComponent) 
  protected _page: SktnPaginationComponent;

  @ContentChild(MdSort) 
  sort: MdSort;

  @Output()
  onChange: EventEmitter<ISktnDataTableEvent> = new EventEmitter();

  subscriptions: Subscription[] = [];

  table_data: ISktnDataTableEvent;

  constructor() { }

  ngOnInit() {
    this.table_data = {
      page: this.page,
      limit: this.limit,
      orderby: this.orderby,
      direction: this.direction
    }
  }

  ngAfterContentInit() {
    if(this.sort) {
      this.subscriptions.push(this.sort.sortChange.subscribe(
        (sort: any) => {
          this.table_data.orderby = sort.active;
          this.table_data.direction = sort.direction.toUpperCase();
          this._registerChange();
        }
      ));
    }

  }

  ngAfterViewInit() {
    
    // This is the filter affect and debounces it for fast typing
    if(this.filter) {
    this.subscriptions.push(Observable.fromEvent(this._filter.nativeElement, 'keyup')
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe(() => {
        this.table_data.filter = this._filter.nativeElement.value;
        this._registerChange();
      }));
    }

    if(this.pagination) {
      // Pagination changes
      this.subscriptions.push(this._page.onChange
        .debounceTime(250)
        .distinctUntilChanged()
        .subscribe(
          (page: ISktnPaginationEvent) => {
            this.table_data.page = page.page;
            this.table_data.limit = page.limit;
            this._registerChange();
          }
        ));
    }
  }
  
  _registerChange() {
    this.onChange.emit(this.table_data);
  }

  refresh() {
    this._registerChange();
  }

  onDestory() {
    this.subscriptions.forEach((sub: Subscription)=> {
      sub.unsubscribe();
    });
  }

}
