import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MdCardModule, MdListModule, MdInputModule, MdCheckboxModule, MdButtonModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { SktnFormErrorsModule } from './../form-errors/form-errors.module';
import { SktnLoginComponent } from './login.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MdCardModule,
    MdListModule,
    MdInputModule,
    MdCheckboxModule,
    MdButtonModule,
    SktnFormErrorsModule
  ],
  declarations: [
    SktnLoginComponent
  ],
  exports: [
    SktnLoginComponent
  ]
})
export class SktnLoginModule { }
