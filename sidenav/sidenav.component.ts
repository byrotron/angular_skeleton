import { 
  Component, 
  Input,
  HostBinding,
} from '@angular/core';
import { Router } from '@angular/router';

import { ISktnSidenav, ISktnSidenavItem } from './interfaces';
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

  @Input()
  sidenav: ISktnSidenav;

  constructor(
    public router: Router
  ) { }

  @HostBinding('@sidenavtoggle')
  binding: string;

  @Input()
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

  deactivateItems() {
    
    this.sidenav.items.map((item: ISktnSidenavItem) => {
      if(item.active) {
        item.active = false;
      }
      return item;
    });

  }

  disableItems(labels: string[]) {
    this.sidenav.items.map((item: ISktnSidenavItem) => {
      if(labels.indexOf(item.label)) {
        item.disabled = true;
      }
      return item;
    });
  }

  activateItems(labels: string[]) {
    this.sidenav.items.map((item: ISktnSidenavItem) => {
      if(labels.indexOf(item.label) >= 0) {
        item.disabled = false;
      }
      return item;
    });
  }

  itemExists(label: string) {

    let ind = this.sidenav.items.findIndex((item: ISktnSidenavItem) => {
      return label === (item.label || item.group);
    });

    if(ind >= 0) {
      return true;
    } else {
      return false;
    }
  }

  insertItems(items: ISktnSidenavItem[]) {
    items.forEach((item: ISktnSidenavItem) => {
      var label = item.label || item.group;
      if(this.itemExists(label) === false) {
        this.sidenav.items.push(item);
      }
    });
  }

  removeItems(labels: string[]) {
    if(this.sidenav && this.sidenav.items.length > 0) {
      this.sidenav.items = this.sidenav.items.filter((item: ISktnSidenavItem) => {
        return labels.indexOf(item.label || item.group) < 0;
      });
    }
  }

}
