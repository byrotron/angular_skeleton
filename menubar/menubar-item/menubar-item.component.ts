import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'sktn-menubar-item',
  templateUrl: './menubar-item.component.html',
  styleUrls: ['./menubar-item.component.scss']
})
export class SktnMenubarItemComponent {

  @Input()
  icon: string;

  @Input()
  image: string;

  @HostBinding('class.fill-space')
  private get setclass(): boolean {
    return this.type === 'spacer' ? true : false;
  }

  @Input()
  type: 'text' | 'icon' | 'spacer' | 'link';

  @Input()
  text: string;

  @Input()
  link: boolean = false;
}
