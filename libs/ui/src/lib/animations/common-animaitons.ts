import {
  trigger,
  style,
  transition,
  animate,
  state,
} from '@angular/animations';

export const fadeInScale = trigger('fadeInScale', [
  state(
    '*',
    style({
      'transform-origin': 'top right',
    })
  ),
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.3)' }),
    animate('0.2s ease'),
  ]),
  transition(':leave', [
    animate('0.25s ease-out', style({ opacity: 0, transform: 'scale(0.3)' })),
  ]),
]);
