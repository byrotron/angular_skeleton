import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MdButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SktnConfirmBoxComponent } from './../confirm-box/confirm-box.component';
import { SktnConfirmBoxModule } from './../confirm-box/confirm-box.module';

import { SktnRolesComponent } from './roles.component';
import { SktnRoleService } from './role.service';
import { SktnRoleFormComponent } from './role-form/role-form.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MdButtonModule,
    FlexLayoutModule,
    SktnConfirmBoxModule
  ],
  entryComponents: [
    SktnRoleFormComponent,
    SktnConfirmBoxComponent
  ],
  declarations: [
    SktnRolesComponent,
    SktnRoleFormComponent
  ],
  exports: [
    SktnRolesComponent
  ],
  providers: [
    SktnRoleService
  ]
})
export class SktnRolesModule { }
