import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { 
  MatButtonModule, 
  MatRadioModule, 
  MatSelectModule, 
  MatListModule, 
  MatInputModule,
  MatDialogModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SktnDataTableModule } from './../data-table/data-table.module';
import { SktnDetailPanelModule } from './../detail-panel/detail-panel.module';
import { SktnUsersComponent } from './users.component';
import { SktnUserService } from './user.service';
import { SktnUserFormComponent } from './user-form/user-form.component';
import { SktnUserDetailComponent } from './user-detail/user-detail.component';
import { SktnFormErrorsModule } from './../form-errors';
import { SktnFormModule } from './../form/form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatSelectModule,
    MatListModule,
    MatDialogModule,
    SktnDataTableModule,
    FlexLayoutModule,
    SktnDetailPanelModule,
    SktnFormModule,
    SktnFormErrorsModule
  ],
  entryComponents: [
    SktnUserFormComponent
  ],
  declarations: [
    SktnUsersComponent,
    SktnUserFormComponent,
    SktnUserDetailComponent
  ],
  exports: [
    SktnUsersComponent,
    SktnUserFormComponent,
    SktnUserDetailComponent
  ],
  providers: [
    SktnUserService
  ]
})
export class SktnUsersModule { }
