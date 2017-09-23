import { Injectable } from '@angular/core';

import { ISktnSidenav, ISktnSidenavItem } from './interfaces';

@Injectable()
export class SktnSidenavService {

  sidenav: ISktnSidenav;

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
    this.sidenav.items = this.sidenav.items.filter((item: ISktnSidenavItem) => {
      return labels.indexOf(item.label || item.group) < 0;
    });
  }
}