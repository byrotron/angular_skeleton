import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { SktnAdminPanelComponent } from './admin-panel.component';
import { SktnAdminPanelService } from './admin-panel.service';
import { SktnBreadcrumbsModule } from './../breadcrumbs';
import { SktnActionBarModule } from './../action-bar';
import { SktnMessagesModule } from './../messages';
import { SktnLoaderModule } from './../loader';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    RouterModule,
    FlexLayoutModule,
    SktnMessagesModule,
    SktnBreadcrumbsModule,
    SktnActionBarModule,
    SktnLoaderModule
  ],
  declarations: [
    SktnAdminPanelComponent
  ],
  exports: [
    SktnAdminPanelComponent
  ],
  providers: [
    SktnAdminPanelService
  ]
})
export class SktnAdminPanelModule { }
