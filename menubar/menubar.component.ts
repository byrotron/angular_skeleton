import { Component, Input, HostBinding } from '@angular/core';

import { SktnSidenavComponent } from './../sidenav/sidenav.component';

@Component({
  selector: 'sktn-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class SktnMenubarComponent {

  @Input()
  sidenav: SktnSidenavComponent;

  @HostBinding('style.backgroundColor')
  @Input()
  background: string;

  @HostBinding('style.color')
  @Input()
  color: string;
}
