import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { SktnBreadcrumbsComponent } from './breadcrumbs.component';
import { SktnUcWordsPipe } from './../pipes';
import { BreadcrumbService } from 'pangular/breadcrumbs/breadcrumb.service';

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
  ],
  providers: [
    BreadcrumbService
  ]
})
export class SktnBreadcrumbsModule { }
