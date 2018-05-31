import { Component, Input, Output, EventEmitter } from "@angular/core";

import { ISktnPagination, ISktnPaginationEvent } from './interfaces';
import { MatOption } from "@angular/material";

@Component ({
    selector: "sktn-pagination",
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
  page_options: number[] = [];

  show: boolean = true;
  
  @Output() 
  onChange: EventEmitter<ISktnPaginationEvent> = new EventEmitter();

  ngOnChanges() {
    this.total_pages = Math.ceil(this.total_items / this.limit);
    this.pageSetup();
  }

  ngOnInit() {
    this.total_pages = Math.ceil(this.total_items / this.limit);
    console.log(this.total_pages);
    this.pageSetup();
  }

  pageSetup() {
    this.page_options = [];

    if(this.total_pages > 0) {
      for(let i=1; i<=this.total_pages; i++) {
        this.page_options.push(i);
      }
    } else {
      this.total_pages = 1;
      this.page_options.push(1);
    }
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

  selectPage(option: MatOption) {

    if(this.active == true) {
      this.current_page = option.value;
      this.onChange.emit({page: this.current_page, limit: +this.limit});
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
