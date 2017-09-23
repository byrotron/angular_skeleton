import { Component, OnInit, Input } from '@angular/core';
import { SktnMessageService } from './../message.service';
import { ISktnMessage } from './../interfaces';
import { FadeToggle } from './../../animations/animations';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'sktn-message',
  templateUrl: './message.component.html',
  styleUrls: [
    './message.component.scss'
  ],
  animations: [
    FadeToggle
  ]
})
export class SktnMessageComponent implements OnInit {

  @Input()
  message: ISktnMessage;

  @Input()
  delay: number;

  show: string = 'show';

  source: Subscription;

  constructor(
    protected msgs: SktnMessageService
  ) { }

  ngOnInit() {

    // Hide the message after a set amount of time
    this.start();

  }

  start() {
    this.source = Observable
      .interval(2000)
      .timeInterval()
      .subscribe(() => {
        this.show = 'hide';
      })
  }

  // When the message is finished with fading remove it from the array
  removeMessage($event, message: ISktnMessage) {
    if($event.toState === 'hide') {
      this.msgs.removeMessage(message);
    }
  }

  onEnter() {
    this.source.unsubscribe();
    this.show = 'show';
  }

  onClick() {
    this.show = 'hide';
  }

  onExit() {
    this.start();
  }

}
