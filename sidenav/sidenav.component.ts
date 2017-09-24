import { 
  Component, 
  Input,
  HostBinding,
} from '@angular/core';
import { Router } from '@angular/router';

import { ISktnSidenav } from './interfaces';
import { SktnSidenavService } from './sidenav.service';
import { SidenavToggle } from './sidenav-toggle';

@Component({
  selector: 'sktn-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: [
    './sidenav.component.scss'
  ],
  animations: [
    SidenavToggle
  ]
})
export class SktnSidenavComponent {

  constructor(
    public router: Router,
    public sidenav_service: SktnSidenavService
  ) { }

  @Input()
  @HostBinding('@sidenavtoggle')
  binding: string;

  show: 'show' | 'hide' = 'show';

  @Input()
  fixed: boolean;

  @Input()
  position: 'left' | 'right';

  ngOnInit() {
    this.binding = this.show + this.position;
  }

  toggle() {
    if(this.show === 'show') {
      this.show = 'hide';
      this.binding = 'hide' + this.position;
    } else if(this.show === 'hide') {
      this.show = 'show';
      this.binding = 'show' + this.position;;
    }
  }

}
