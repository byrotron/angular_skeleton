import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SktnMenubarComponent } from './menubar.component';
import { SktnMenubarGroupComponent } from './menubar-group/menubar-group.component';
import { SktnMenubarItemComponent } from './menubar-item/menubar-item.component';
import { SktnMenbarIconComponent } from './menbar-icon/menbar-icon.component';
import { SktnMenbarImgComponent } from './menbar-img/menbar-img.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule
  ],
  declarations: [
    SktnMenubarComponent,
    SktnMenubarGroupComponent,
    SktnMenubarItemComponent,
    SktnMenbarIconComponent,
    SktnMenbarImgComponent
  ],
  exports: [
    SktnMenubarComponent,
    SktnMenubarGroupComponent,
    SktnMenubarItemComponent
  ]
})
export class SktnMenubarModule { }
