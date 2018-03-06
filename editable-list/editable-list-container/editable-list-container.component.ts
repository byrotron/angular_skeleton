import { Component, Input, OnInit, Inject, Output, EventEmitter, Optional } from '@angular/core';

import { ISktnEditableListItem } from './../interfaces';
import { ISktnResponse } from './../../interfaces/interfaces';

import { SktnEditableListService } from './../editable-list.service';

import { Mat_DIALOG_DATA } from '@angular/material';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'sktn-editable-list-container',
  templateUrl: './editable-list-container.component.html',
  styleUrls: [
    './editable-list-container.component.scss'
  ]
})
export class SktnEditableListContainerComponent implements OnInit {

  new_item: string;

  @Input()
  id: number;

  @Input()
  name: string;

  @Input()
  group: string;

  @Input()
  items: ISktnEditableListItem[] = [];

  @Output()
  itemsChange: EventEmitter<ISktnEditableListItem[]> = new EventEmitter();

  constructor(
    public list: SktnEditableListService,
    @Optional() @Inject(Mat_DIALOG_DATA) public data: any,
    @Optional() public dialog: MatDialogRef<SktnEditableListContainerComponent>
  ) { }

  ngOnInit() {
    if(this.data) {
      this.id = this.data.id;
      this.items = this.data.items;
      this.name = this.data.name;
      this.group = this.data.group;
    }
  }

  create() {
    this.list.loading = true;
    this.list.errors = [];
    if(this.new_item.length > 0) {
      var item: ISktnEditableListItem = {
        value: this.new_item
      }
      this.list.create(this.id, this.name, this.group, item).subscribe(
        (response: ISktnResponse) => {
          item.id = response.result;
          item.status = true;
          this.items.push(item);
          this.new_item = undefined;
          this.list.loading = false;
        },
        () => {
          this.list.loading = false;
        }
      );
    }
  }

  save() {
    this.dialog.close(this.items);
  }

}
