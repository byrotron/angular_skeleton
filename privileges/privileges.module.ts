import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdSlideToggleModule } from '@angular/material';
import { SktnAccordionModule } from './../accordion/accordion.module';
import { SktnPrivilegesComponent } from './privileges.component';
import { SktnPrivilegesService } from './privileges.service';

@NgModule({
  imports: [
    CommonModule,
    MdSlideToggleModule,
    SktnAccordionModule
  ],
  declarations: [
    SktnPrivilegesComponent
  ],
  exports: [
    SktnPrivilegesComponent
  ],
  providers: [
    SktnPrivilegesService
  ]
})
export class SktnPrivilegesModule { }
