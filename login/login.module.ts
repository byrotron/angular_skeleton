import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { 
  MatCardModule, 
  MatListModule, 
  MatInputModule, 
  MatCheckboxModule, 
  MatButtonModule
 } from '@angular/material';
import { RouterModule } from '@angular/router';
import { SktnFormErrorsModule } from './../form-errors/form-errors.module';
import { SktnLoginComponent } from './login.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule, 
    MatListModule, 
    MatInputModule, 
    MatCheckboxModule, 
    MatButtonModule,
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
