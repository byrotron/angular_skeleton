import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule, MatCardModule, MatListModule, MatButtonModule, MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { SktnUploadFileComponent } from './upload-file/upload-file.component';
import { SktnUploadImageComponent } from './upload-image/upload-image.component';
import { SktnFileReaderService } from './file-reader.service';
import { SktnBase64 } from './base64.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatProgressBarModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule
  ],
  exports: [
    SktnUploadFileComponent,
    SktnUploadImageComponent
  ],
  declarations: [
    SktnUploadFileComponent,
    SktnUploadImageComponent,
  ],
  providers: [
    SktnFileReaderService,
    SktnBase64
  ]
})
export class SktnUploadModule { }
