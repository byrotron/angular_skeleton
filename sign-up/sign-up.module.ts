import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MdCardModule, MdListModule, MdButtonModule, MdInputModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { SktnFormErrorsModule } from './../form-errors/form-errors.module';
import { SktnSignUpComponent } from './sign-up.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MdCardModule,
    MdListModule,
    MdButtonModule,
    MdInputModule,
    RouterModule,
    SktnFormErrorsModule
  ],
  declarations: [
    SktnSignUpComponent
  ],
  exports: [
    SktnSignUpComponent
  ]
})
export class SktnSignUpModule { }
