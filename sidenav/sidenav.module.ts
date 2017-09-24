import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SktnSidenavComponent } from './sidenav.component';
import { SktnSidenavItemComponent } from './sidenav-item/sidenav-item.component';

import { SktnSidenavService } from './sidenav.service';

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
  ],
  providers: [
    SktnSidenavService
  ]
})
export class SktnSidenavModule { }
