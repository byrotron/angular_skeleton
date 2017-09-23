import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MdButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SktnSettingsComponent } from './settings.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MdButtonModule,
    FlexLayoutModule
  ],
  declarations: [ 
    SktnSettingsComponent
  ],
  exports: [ 
    SktnSettingsComponent
  ]
})
export class SktnSettingsModule { }
