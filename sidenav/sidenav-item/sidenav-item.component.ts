import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ISktnSidenavItem } from './../interfaces';
import { SktnSidenavService } from './../sidenav.service';

@Component({
  selector: 'sktn-sidenav-item',
  templateUrl: './sidenav-item.component.html',
  styleUrls: [
    './sidenav-item.component.scss'
  ],
})
export class SktnSidenavItemComponent {

  @Input()
  item: ISktnSidenavItem;

  active: boolean;

  constructor(
    public router: Router,
    public sidenav: SktnSidenavService
  ) {}

  ngOnInit() {
 
    if(this.item.link && this.router.isActive(this.router.createUrlTree(this.item.link), true)) {
      this.item.active = true;
    }

  }

  activate() {

    if(!this.item.active && !this.item.disabled) {
      this.router.navigate(this.item.link);
    }
    
  }

  ngDoCheck() {
    if(this.item.link && this.router.isActive(this.router.createUrlTree(this.item.link), true)) {
      this.item.active = true;
    } else {
      this.item.active = false;
    }
  }

}
