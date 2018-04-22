import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SktnResetAccountComponent } from './reset-account.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatListModule, MatInputModule, MatButtonModule } from '@angular/material';
import { SktnWebsitePanelModule } from './../website-panel/';
import { SktnNotificationComponent } from './notification/notification.component';
import { SktnAccountComponent } from './account/account.component';
import { SktnFormErrorsModule } from './../form-errors/form-errors.module';
import { SktnValidators } from 'pangular';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule, 
    MatListModule, 
    MatInputModule, 
    MatButtonModule,
    SktnFormErrorsModule,
    SktnWebsitePanelModule
  ],
  declarations: [
    SktnResetAccountComponent,
    SktnNotificationComponent,
    SktnAccountComponent
  ],
  exports: [
    SktnResetAccountComponent
  ],
  providers: [
    SktnValidators
  ]
})
export class SktnResetAccountModule { }
