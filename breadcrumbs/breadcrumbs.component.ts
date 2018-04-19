import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BreadcrumbService } from 'pangular/breadcrumbs/breadcrumb.service';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'sktn-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class SktnBreadcrumbsComponent  {

  constructor(
    protected router: Router,
    public breadcrumbs: BreadcrumbService
  ) { }

  ngOnInit() {

    this.generateBreadcrumbs(this.router.url)

    this.router.events.forEach((event) => {
      if(event instanceof NavigationEnd) {
        this.generateBreadcrumbs(event.url)
      }

    });

  }

  generateBreadcrumbs(urls: any) {
    let url_arr = urls.split('/').splice(1)
    this.breadcrumbs.urls = url_arr.map((string: string) => {
      return {
        name: this.breadcrumbs.mappings[string.toLowerCase()] ? this.breadcrumbs.mappings[string.toLowerCase()] : string,
        url: string
      }
    });
  }

  breadcrumbNavigator(ind: number) {
    
    this.breadcrumbs.urls.splice(ind + 1);
    let urls = this.breadcrumbs.urls.map((item: any) => {
      return item.url;
    })
    this.router.navigate(urls);
    
  }

}
