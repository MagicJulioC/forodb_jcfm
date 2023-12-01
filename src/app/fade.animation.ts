import { animate, style, transition, trigger } from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('2000ms', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    animate('2000ms', style({ opacity: 0 })),
  ]),
]);

export const pulse = trigger('pulse', [
  transition('void => *', [
    style({ transform: 'scale(1)' }),
    animate('1000ms', style({ transform: 'scale(1.05)' })),
    animate('1000ms', style({ transform: 'scale(1)' })),
  ]),
]);
