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
      height: 0,
      display: 'none'
    })
  ),
  state('show',
    style({
      transform: "translateY(0)",
      height: 'auto',
      display: 'initial'
    })
  ),
  transition('show=>hide', [
    animate('500ms ease-in', style({
      transform: "translateY(100%)",
      height: 0,
    }))
  ]),
   transition('hide=>show', [
    animate('500ms ease-out', style({
      transform: "translateY(0)",
      height: 'auto'
    }))
  ])
]);