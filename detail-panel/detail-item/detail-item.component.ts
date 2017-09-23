import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { SktnDetailPanelService } from './../detail-panel.service';
import { ISktnListItem } from './../interfaces';

@Component({
  selector: 'sktn-detail-item',
  templateUrl: './detail-item.component.html',
  styleUrls: [
    './detail-item.component.scss'
  ]
})
export class SktnDetailItemComponent {

  @Input()
  title: string;

  @Input()
  name: string;

  @Input()
  value: string;

  @Input()
  editable = true;

  @Input()
  list: ISktnListItem[];

  @Input()
  type: string;

  @Input()
  editing: boolean;

  form_control: FormControl;

  constructor(
    public panel: SktnDetailPanelService
  ) {}

  findListValue() {
    let result: ISktnListItem = this.list.find((item: ISktnListItem) => {
      return item.id == this.panel.form.get(this.name).value
    });
    
    return result.name;
  }

  submitForm() {
    this.panel.submit.emit(true);
  }
}
