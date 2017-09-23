import { Component, Input, EventEmitter, Output } from '@angular/core';
import { SktnFileReaderService } from './../file-reader.service';
import { SktnBase64 } from './../base64.service';

@Component({
  selector: 'sktn-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: [
    './upload-image.component.scss'
  ]
})
export class SktnUploadImageComponent {

  @Input()
  src: string;

  @Input()
  show_btn: boolean = true;

  @Output()
  onComplete: EventEmitter<File> = new EventEmitter();

  @Output()
  onDelete: EventEmitter<any> = new EventEmitter();

  drop_ready: boolean = false;

  progress: number;

  constructor(
    protected reader: SktnFileReaderService,
    protected base64: SktnBase64
  ) { }

  ngOnInit() {
    
  }

  startDrop() {

    this.drop_ready = true;
  
  }

  preventDefault(e: DragEvent) {

    if (e.preventDefault) {
      e.preventDefault(); // Necessary. Allows us to drop.
    }

  }

  stopDrop() {

    this.drop_ready = false;

  }

  drop(e: DragEvent) {

    if (e.stopPropagation) {
      e.preventDefault();
      e.stopPropagation(); // stops the browser from redirecting.
    }

    let file: File = e.dataTransfer.files[0];
    this.reader.readFile(file);

    this.reader.result.then(
      (result: string) => {
        // Encode file into base64 to render in browser
        this.src = result;
        this.onComplete.emit(file);
      }
    );

    this.reader.progress.then(
      (progress: number) => {
        this.progress = progress;
      }
    );

    // this.drop_ready = false;

  }

  uploadImage(files: FileList) {

    let file:File = files[0];

    this.reader.readFile(file);

    this.reader.result.then(
      (result: string) => {
        // Encode file into base64 to render in browser
        this.src = result;
        this.onComplete.emit(files[0]);
      }
    );

    this.reader.progress.then(
      (progress: number) => {
        this.progress = progress;
      }
    );

  }

  removeImage() {
    this.src = undefined;
    this.onDelete.emit();
  }
}
