import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sktn-setting-item',
  templateUrl: './setting-item.component.html',
  styleUrls: [
    './setting-item.component.scss'
  ]
})
export class SktnSettingItemComponent {

  @Input()
  title: string;

  @Input()
  icon: string;

}
