import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material';
import { SktnAccordionModule } from './../accordion/accordion.module';
import { SktnPrivilegesComponent } from './privileges.component';
import { SktnPrivilegesService } from './privileges.service';

@NgModule({
  imports: [
    CommonModule,
    MatSlideToggleModule,
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
