import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatButtonModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import { SktnDetailPanelComponent } from './detail-panel.component';

import { SktnDetailItemComponent } from './detail-item/detail-item.component';
import { SktnFormErrorsModule } from'./../form-errors/form-errors.module';

import { SktnDetailPanelService } from './detail-panel.service';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    SktnFormErrorsModule
  ],
  declarations: [
    SktnDetailPanelComponent,
    SktnDetailItemComponent
  ],
  exports: [
    SktnDetailPanelComponent,
    SktnDetailItemComponent
  ],
  providers: [
    SktnDetailPanelService
  ]
})
export class SktnDetailPanelModule { }
