import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SktnEditableListService } from './../editable-list.service';
import { ISktnEditableListItem } from './../interfaces';
import { ISktnResponse } from './../../interfaces/interfaces';

@Component({
  selector: 'sktn-editable-list-item',
  templateUrl: './editable-list-item.component.html',
  styleUrls: [
    './editable-list-item.component.scss'
  ]
})
export class SktnEditableListItemComponent {

  @Input()
  item: ISktnEditableListItem;

  @Output()
  itemChange: EventEmitter<ISktnEditableListItem> = new EventEmitter();

  editing = false;

  constructor(
    public list: SktnEditableListService
  ) { }

  update() {
    this.list.loading = true;
    this.list.update(this.item).subscribe(
        (response: ISktnResponse) => {

          this.editing = false;
          this.list.loading = false;
        },
        (err: Error) => {

          this.editing = false;

        }
      );
  }

  delete() {
    this.list.loading = true;
    if(this.item.status === true) {
      this.item.status = false;
      this.list.update(this.item).subscribe(
        (response: ISktnResponse) => {

          if(response.status === false) {
            this.item.status = true;
          }
          this.list.loading = false;
        },
        (err: Error) => {
          this.item.status = true;
        }
      );
    }
  
  }

  undo() {
    this.list.loading = true;
    if(this.item.status === false) {
      this.item.status = true;
      this.list.update(this.item).subscribe(
        (response: ISktnResponse) => {

          if(response.status === false) {
            this.item.status = false;
            
          }
          this.list.loading = false;
        },
        (err: Error) => {
          this.item.status = true;
        }
      );
    }
  }

}
