import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SktnMessagesComponent } from './messages.component';
import { SktnMessageComponent } from './message/message.component';
import { SktnMessageService } from './message.service';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule
  ],
  declarations: [
    SktnMessagesComponent, 
    SktnMessageComponent
  ],
  exports: [
    SktnMessagesComponent
  ],
  providers: [
    SktnMessageService
  ]
})
export class SktnMessagesModule { }
