import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdProgressSpinnerModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SktnLoaderComponent } from './loader.component';

@NgModule({
  imports: [
    CommonModule,
    MdProgressSpinnerModule,
    FlexLayoutModule
  ],
  declarations: [
    SktnLoaderComponent
  ],
  exports: [
    SktnLoaderComponent
  ]
})
export class SktnLoaderModule { }
