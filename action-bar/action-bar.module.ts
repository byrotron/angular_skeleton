import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SktnActionBarComponent } from './action-bar.component';
import { SktnActionBarService } from './action-bar.service';
import { SktnActionBarDirective } from './action-bar.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SktnActionBarComponent,
    SktnActionBarDirective
  ],
  exports: [
    SktnActionBarComponent,
    SktnActionBarDirective
  ],
  providers: [
    SktnActionBarService
  ]
})
export class SktnActionBarModule { }
