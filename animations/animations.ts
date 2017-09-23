import { animate, AnimationEntryMetadata, state, style, transition, trigger } from '@angular/core';

import { easing_list } from './easings';

// export function fadeout(out = 800, easeout  = "ease-out") {

//   return trigger("fadeout", [
//     state('hide',
//         style({
//           opacity: 0,
//           transform: 'translateY(-100%)'
//         })
//       ),
//       state('show',
//         style({
//           opacity: 1,
//           transform: 'translateY(0)'
//         })
//       ),
//       transition('show=>hide', [
//         animate(out + 'ms ' + easing_list[easeout], style({
//           opacity: 0
//         }))
//       ])
//     ]);

// }

export const FadeOut = trigger("fadeout", [
  state('hide',
    style({
      opacity: 0
    })
  ),
  state('show',
    style({
      opacity: 1
    })
  ),
  transition('show=>hide', [
    animate('800ms cubic-bezier(0.19, 1, 0.22, 1)', style({
      opacity: 0
    }))
  ])
]);

export const SlideVerticalToggle = trigger("slidetoggle", [
  state('hide',
    style({
      transform: "translateY(100%)"
    })
  ),
  state('show',
    style({
      transform: "translateY(0)"
    })
  ),
  transition('show=>hide', [
    animate('500ms ease-in', style({
      transform: "translateY(100%)"
    }))
  ]),
   transition('hide=>show', [
    animate('500ms ease-out', style({
      transform: "translateY(0)"
    }))
  ])
]);

export const FadeToggle = trigger("fadetoggle", [
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
  transition( 'show => hide', animate( '800ms ease-in', style({ opacity: 0 } ) ) ),
  transition( 'hide => show', animate( '800ms ease-out', style({ opacity: 1 } ) ) )
]);

export function SlideToggleVertical(height = '100%', start = 300, easein = "ease-in", end = 800, easeout  = "ease-out") {

  return trigger("slidetogglevertical", [
      state('hide',
        style({
          'max-height': '0%'
        })
      ),
      state('show',
        style({
          'max-height': height
        })
      ),
      transition('hide=>show', [
        animate(start + 'ms ' + easein, style({
          'max-height': height
        }))
      ]),
      transition('show=>hide', [
        animate(end + 'ms ' + easeout, style({
          'max-height':'0%'
        }))
      ])
    ]);

}
