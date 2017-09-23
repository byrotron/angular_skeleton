import { Component, trigger, state, style, transition, animate } from '@angular/core';
import { SktnWebsitePanelService } from './website-panel.service';
import { SktnMessageService } from './../messages';
import { FadeToggle } from './../animations/animations';

@Component({
  selector: 'sktn-website-panel',
  templateUrl: './website-panel.component.html',
  styleUrls: [
    './website-panel.component.scss'
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
  ]
})
export class SktnWebsitePanelComponent {

  constructor(
    public web: SktnWebsitePanelService
  ){}

}
