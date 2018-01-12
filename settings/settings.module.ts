import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MdButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SktnSettingsComponent } from './settings.component';
import { SktnSettingItemComponent } from './setting-item/setting-item.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MdButtonModule,
    FlexLayoutModule
  ],
  declarations: [ 
    SktnSettingsComponent,
    SktnSettingItemComponent
  ],
  exports: [ 
    SktnSettingsComponent,
    SktnSettingItemComponent
  ]
})
export class SktnSettingsModule { }
