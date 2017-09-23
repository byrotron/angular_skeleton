import { Component, Input, HostBinding, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { ISktnSidenav } from './interfaces';
import { SktnSidenavService } from './sidenav.service';

@Component({
  selector: 'sktn-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: [
    './sidenav.component.scss'
  ]
})
export class SktnSidenavComponent {

  constructor(
    public router: Router,
    public sidenav_service: SktnSidenavService
  ) { }

  @Input()
  sidenav: ISktnSidenav;

  ngOnInit() {
    this.sidenav_service.sidenav = this.sidenav;
  }

}
