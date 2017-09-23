import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { SktnBreadcrumbsComponent } from './breadcrumbs.component';
import { SktnUcWordsPipe } from './../pipes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule
  ],
  declarations: [
    SktnBreadcrumbsComponent,
    SktnUcWordsPipe
  ],
  exports: [
    SktnBreadcrumbsComponent
  ]
})
export class SktnBreadcrumbsModule { }
