import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SktnSidenavComponent } from './sidenav.component';
import { SktnSidenavItemComponent } from './sidenav-item/sidenav-item.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    SktnSidenavComponent, 
    SktnSidenavItemComponent
  ],
  exports: [
    SktnSidenavComponent,
    SktnSidenavItemComponent
  ]
})
export class SktnSidenavModule { }
