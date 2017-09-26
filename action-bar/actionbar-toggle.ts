import { 
  trigger, 
  state, 
  style, 
  animate,
  transition
} from '@angular/core';

export const ActionbarToggle =  trigger("slidetoggle", [
  state('hide',
    style({
      transform: "translateY(100%)",
      height: '0px'
    })
  ),
  state('show',
    style({
      transform: "translateY(0)",
      height: '*'
    })
  ),
  transition('show=>hide', [
    animate('300ms ease-in', style({
      transform: "translateY(100%)",
      height: '0px',
    }))
  ]),
   transition('hide=>show', [
    animate('300ms ease-out', style({
      transform: "translateY(0)",
      height: '*'
    }))
  ])
]);