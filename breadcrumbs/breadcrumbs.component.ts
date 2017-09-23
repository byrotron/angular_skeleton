import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'sktn-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class SktnBreadcrumbsComponent  {

  urls: string[] = [];

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
    this.router.events.forEach((event) => {

      if(event instanceof NavigationEnd) {
        this.urls = event.url.split('/').splice(1);
      }

    });
  }

  breadcrumbNavigator(ind: number) {
    
    if(this.urls.length > 0) {
      this.urls.splice(ind + 1);
      this.router.navigate(this.urls);
    } else {
      this.router.navigate(['/admin']);
    }
    
  }


}
