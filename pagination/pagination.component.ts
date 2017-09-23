import { Component, Input, Output, EventEmitter } from "@angular/core";

import { ISktnPagination, ISktnPaginationEvent } from './interfaces';

@Component ({
    selector: "app-pagination",
    templateUrl: "./pagination.component.html",
    styleUrls: [
        './pagination.component.scss'
    ]
})

export class SktnPaginationComponent {
    
  @Input()
  current_page: number = 1;

  @Input()
  limit: number = 50;
  
  @Input()
  total_items: number;

  @Input()
  active: boolean = true;

  limits = [
      10,
      20,
      30,
      50,
      100
  ];

  total_pages: number;

  show: boolean = true;
  
  @Output() 
  onChange: EventEmitter<ISktnPaginationEvent> = new EventEmitter();

  ngOnChanges() {
    this.total_pages = Math.ceil(this.total_items / this.limit);
  }

  ngOnInit() {
    this.total_pages = Math.ceil(this.total_items / this.limit);
  }
  
  next() {

    if(this.active == true) {

      if(this.current_page + 1 <= this.total_pages) {
        this.current_page = this.current_page + 1;
        this.onChange.emit({page: this.current_page, limit: +this.limit});
      }

    }

  }
  
  prev() {

    if(this.active == true) {

      if(this.current_page - 1 > 0) {
        this.current_page = this.current_page - 1;
        this.onChange.emit({page: this.current_page, limit: +this.limit});
      }

    }

  }
  
  last() {

    if(this.active == true) {

      if(this.current_page != this.total_pages) {
        this.current_page = this.total_pages;
        this.onChange.emit({page: this.current_page, limit: +this.limit});
      }

    }

  }
  
  first() {

    if(this.active == true) {
      
      if(this.current_page !== 1) {
        this.current_page = 1;
        this.onChange.emit({page: this.current_page, limit: +this.limit});
      }

    }

  }

  selectPage(page: number) {
    
    if(this.active == true) {

      if(this.current_page + 1 <= this.total_pages && this.current_page - 1 > 0 ) {
        this.current_page = page;
        this.onChange.emit({page: this.current_page, limit: +this.limit});
      }

    }

  }
  
  changeLimit() {
      
    if(this.active == true) {
      
      if(this.current_page !== this.limit) {
        this.onChange.emit({page: this.current_page, limit: +this.limit});
      }

    }

  }

}
