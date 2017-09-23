import { Component, 
  Input, 
  Output, 
  EventEmitter, 
  ContentChildren, 
  QueryList,
  ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { SktnDetailItemComponent } from './detail-item/detail-item.component';
import { SktnDetailPanelService } from'./detail-panel.service';
import { ISktnListItem } from './interfaces';

@Component({
  selector: 'sktn-detail-panel',
  templateUrl: './detail-panel.component.html',
  styleUrls: [
    './detail-panel.component.scss'
  ],
  providers: [
    SktnDetailPanelService
  ]
})
export class SktnDetailPanelComponent {

  @Input()
  title: string;

  @Input()
  form: FormGroup;

  @Input()
  disabled = false

  @Input()
  editing: boolean;

  @Output()
  editingChange: EventEmitter<boolean> = new EventEmitter();

  @Input()
  loading: boolean;

  @Output()
  loadingChange: EventEmitter<boolean> = new EventEmitter();

  @Output()
  submit: EventEmitter<boolean> = new EventEmitter();

  constructor(
    public panel: SktnDetailPanelService,
    private changer: ChangeDetectorRef
  ) {}

  ngOnInit() {

    this.panel.form = this.form;
    this.panel.editing = this.editing;

    this.panel.submit.subscribe(
      (edit: boolean) => {
        this.update();
      }
    );

  }

  ngOnChanges() {
    this.panel.editing = this.editing;
  }

  startEditing() {
    this.editingChange.emit(true);
  }

  stopEditing() {
    this.editingChange.emit(false);
  }

  update() {
    if(this.panel.form.dirty && this.panel.form.valid) {
      this.submit.emit(true);
    }
  }
}
