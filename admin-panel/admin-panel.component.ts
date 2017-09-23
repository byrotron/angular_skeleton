import { 
  Component, 
  OnInit,
  trigger, 
  state, 
  style, 
  animate,
  transition,
  ChangeDetectorRef
} from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { ISktnResponse } from './../interfaces/interfaces';
import { SktnAdminPanelService } from './admin-panel.service';
import { SktnAuthService } from './../app/auth.service'; 
import { ISktnSidenav } from './../sidenav'; 

import { FadeToggle } from './../animations/animations';

import { Observable, Observer } from 'rxjs';

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
    ]),
    trigger("sidenavtoggle", [
      state('hide',
        style({
          'max-width': '0%'
        })
      ),
      state('show',
        style({
          'max-width': '12%'
        })
      ),
      transition('hide=>show', [
        animate('300ms ease-in', style({
          'max-width': '12%'
        }))
      ]),
      transition('show=>hide', [
        animate('300ms ease-out', style({
          'max-width':'0%'
        }))
      ])
    ])
  ]
})
export class SktnAdminPanelComponent {

  constructor(
    protected ref: ChangeDetectorRef,
    public admin: SktnAdminPanelService
  ) { }

}
