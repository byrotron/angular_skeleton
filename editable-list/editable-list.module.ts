import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SktnEditableListComponent } from './editable-list.component';
import { SktnEditableListService } from './editable-list.service';
import { SktnEditableListItemComponent } from './editable-list-item/editable-list-item.component';
import { SktnEditableListContainerComponent } from './editable-list-container/editable-list-container.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdButtonModule,
    FlexLayoutModule
  ],
  declarations: [
    SktnEditableListComponent,
    SktnEditableListItemComponent,
    SktnEditableListContainerComponent
  ],
  entryComponents: [
    SktnEditableListContainerComponent
  ],
  exports: [
    SktnEditableListComponent
  ],
  providers: [
    SktnEditableListService
  ]
})
export class SktnEditableListModule { }
