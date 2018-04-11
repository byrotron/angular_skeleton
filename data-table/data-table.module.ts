import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatTableModule, MatButtonModule, MatMenuModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SktnDataTableComponent } from './data-table.component';
import { SktnPaginationModule } from './../pagination';
import { SktnDataTableService } from './data-table.service';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatMenuModule,
    CdkTableModule,
    FlexLayoutModule,
    SktnPaginationModule
  ],
  declarations: [
    SktnDataTableComponent
  ],
  exports: [
    SktnDataTableComponent,
    CdkTableModule,
    MatTableModule
  ],
  providers: [
    SktnDataTableService
  ]
})
export class SktnDataTableModule { }
