import { 
  Component, 
  OnInit,
  ContentChild,
  ViewChild,
  forwardRef,
  trigger, 
  state, 
  style, 
  animate,
  transition
} from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { ISktnResponse } from './../interfaces/interfaces';
import { SktnAdminPanelService } from './admin-panel.service';
import { SktnAuthService } from './../app/auth.service'; 
import { ISktnSidenav } from './../sidenav'; 

import { FadeToggle } from './../animations/animations';

import { Observable, Observer } from 'rxjs';

import { SktnSidenavComponent } from './../sidenav';
import { SktnActionBarComponent } from './../action-bar';
import { SktnBreadcrumbsComponent } from './../breadcrumbs';

@Component({
  selector: 'sktn-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: [
    './admin-panel.component.scss'
  ],
  animations: [
    trigger("fadetoggle", [
      state('hide',
        style({
          opacity: 0,
          transform: 'translate(-9999px)'
        })
      ),
      state('show',
        style({
          opacity: 1,
          transform: 'translate(0)'
        })
      ),
      transition( 'show => hide', animate( '800ms ease-out', style({ opacity: 0 } ) ) ),
      transition( 'hide => show', animate( '0ms', style({ opacity: 1 } ) ) )
    ])
  ]
})
export class SktnAdminPanelComponent {

  @ContentChild(forwardRef(() => 'leftsidenav')) left_nav: SktnSidenavComponent;
  @ContentChild(forwardRef(() => 'rightsidenav')) right_nav: SktnSidenavComponent;

  @ViewChild(SktnActionBarComponent) action_bar: SktnActionBarComponent;
  @ViewChild(SktnBreadcrumbsComponent) breadcrumbs: SktnBreadcrumbsComponent;

  constructor(
    public admin: SktnAdminPanelService
  ) { }

  ngAfterViewInit() {

    this.admin.action_bar = this.action_bar;
    this.admin.breadcrumbs = this.breadcrumbs; 
    
  }

  ngAfterContentInit() {
    
    this.admin.left_nav = this.left_nav;
    this.admin.right_nav = this.right_nav;

  }

} 
