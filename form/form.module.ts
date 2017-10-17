import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';
import { SktnFormComponent } from './form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  declarations: [
    SktnFormComponent  
  ],
  exports: [
    SktnFormComponent
  ]
})
export class SktnFormModule { }
