import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { SktnFormErrorsModule } from './../form-errors/form-errors.module';
import { SktnEmailVerificationComponent } from './email-verification.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
    SktnFormErrorsModule
  ],
  declarations: [
    SktnEmailVerificationComponent
  ],
  exports: [
    SktnEmailVerificationComponent
  ]
})
export class SktnEmailVerificationModule { }
