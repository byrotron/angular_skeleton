import { Component, OnInit, Input, Output, EventEmitter, forwardRef, ContentChild } from '@angular/core';
import { ControlValueAccessor,  NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, FormControl, NgModel } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';

import { SktnEditableListService } from './editable-list.service';
import { ISktnEditableList, } from './interfaces';
import { ISktnResponse } from './../interfaces/interfaces';
import { SktnEditableListContainerComponent } from './editable-list-container/editable-list-container.component'

@Component({
  selector: 'sktn-editable-list',
  templateUrl: './editable-list.component.html',
  styleUrls: [
    './editable-list.component.scss'
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SktnEditableListComponent),
      multi: true,
    }
  ]
})
export class SktnEditableListComponent implements OnInit, ControlValueAccessor  {

  @Input()
  editable: boolean;

  @Input()
  label: string;

  @Input()
  name: string;
  
  @Input()
  group: string;

  @Input()
  inline = false;

  @Input()
  control_class: string;
  
  @Input()
  group_class: string;

  control: FormControl = new FormControl();;

  id: number;

  editing = false;

  dialog_ref: MatDialogRef<SktnEditableListContainerComponent>;

  list: ISktnEditableList;

  _value: any;
  propagateChange: Function;

  constructor(
    public list_service: SktnEditableListService,
    protected dialog: MatDialog
  ) { }

  ngOnInit() {

    this.list_service.loading = true;
    this.list_service.getList(this.group, this.name).subscribe(
      (val: any) => {
        let ind = this.list_service.findListIndex(this.group, this.name);
        this.list = this.list_service.lists[ind];
        this.list_service.loading = false;
      }
    );

  }

  get value() {
    return this._value;
  }

  set value(val: any) {
    this._value = val;
    this.propagateChange(this._value);
  }

  public writeValue(val: any) {
    this._value = val;
  }

  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }
  
  public registerOnTouched() { }

  openEditor() {

    this.list_service.editing = true;

    this.dialog_ref = this.dialog.open(SktnEditableListContainerComponent, {
      width: '38rem',
      data: {
        items: this.list.items,
        id: this.list.id,
        name: this.name,
        group: this.group,
        disableClose: true
      }
    });

  }

}
