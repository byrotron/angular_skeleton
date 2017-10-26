import { Component, OnInit, Input } from '@angular/core';
import { ISktnMessage } from './interfaces';
import { SktnMessageService } from './message.service';

@Component({
  selector: 'sktn-messages',
  templateUrl: './messages.component.html',
  styleUrls: [
    './messages.component.scss'
  ]
})
export class SktnMessagesComponent implements OnInit {

  @Input()
  position = ['top', 'right'];

  @Input()
  delay: number = 8000;
  
  constructor(
    public msg: SktnMessageService
  ) { }

  ngOnInit() {
  }

}
