import { Component, Input, trigger, state, style, transition, animate } from '@angular/core';


@Component({
  selector: 'sktn-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: [
    './accordion.component.scss'
  ],
  animations: [
    trigger("slideToggle", [
      state('hide',
        style({
          'height': 0,
          'display': 'none'
        })
      ),
      state('show',
        style({
          'height': '*',
          'display': 'initial'
        })
      ),
      transition('hide=>show', [
        animate('300ms ease-in', style({
          'height': '*'
        }))
      ]),
      transition('show=>hide', [
        animate('300ms ease-out', style({
          'height': 0
        }))
      ])
    ])
  ]
})
export class SktnAccordionComponent {

  show: 'hide' | 'show' = 'hide';

  @Input()
  label: string;

  @Input()
  border = false;

  toggleAccordion() {
    if(this.show === 'hide') {
      this.show = 'show';
    } else if(this.show === 'show') {
      this.show = 'hide';
    }
  }

}
