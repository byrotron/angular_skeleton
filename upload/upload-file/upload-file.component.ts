import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'sktn-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: [
    './upload-file.component.scss'
  ]
})
export class SktnUploadFileComponent {

  @Input()
  files: File[] = [];

  @Input()
  title: string;

  @Input()
  allowed: string[] = [];

  @Input()
  max: number = 1;

  errors: Error[] = [];

  drag = false;

  @Output()
  onFileSelect: EventEmitter<File[]> = new EventEmitter();

  @Output()
  onErrors: EventEmitter<Error[]> = new EventEmitter();

  constructor() { }

  validate(file: File) {

    this.allowedExtensions(file);
    this.isUniqueFile(file);

  }

  setFiles(file_list: FileList) {

    if(this.maxAllowed(file_list)) {

      for(let i = 0; i < file_list.length; i++) {
        this.validate(file_list.item(i));

        if(this.errors.length === 0) {
          this.files.push(file_list.item(i));
        }

      }

    }

  }

  maxAllowed(files: FileList) {

    if(files.length + this.files.length > this.max) {  
      this.errors.push(new Error("You are not allowed to upload more than " + this.max + " files"));
      return false;
    } else {
      return true;
    }
    
  }

  setRegExpStr() {
    let patt: string;
    this.allowed.forEach((item: string, i: number) => {
      if(i === 0) {
        patt = '\.' + item;
      } else {
        patt += '|\.' + item;
      }
    });
    return patt;
  }

  allowedExtensions(file: File) {
 
    if(this.allowed.length > 0) {

      const str = '(' + this.setRegExpStr() + ')$';
      const patt = new RegExp( str, 'i');

      if(!patt.test(file.name)) {
        this.errors.push(new Error(file.name + ' file extension is invalid, must be one of the following ' + this.allowed.toString())); 
      }

    }
    
  }

  isUniqueFile(file: File) {

    let found = this.files.findIndex((item: File) => {
      return file.name == item.name
    });

    if(found >= 0) {
      this.errors.push(new Error(file.name + ' is a duplicate'));
    }

  }

  reset() {
    this.errors = [];
    this.onErrors.emit(this.errors);
  }

  fileSelected(file_list: FileList) {

    this.reset();    
    this.setFiles(file_list);
    
    if(this.errors.length === 0) {
      this.onFileSelect.emit(this.files);
    } else {
      this.onErrors.emit(this.errors);
    }

  }

  removeFile(ind: number) {

    this.files.splice(ind, 1);
    this.onFileSelect.emit(this.files);

  }

  drop(ev) {
    ev.preventDefault();
    this.fileSelected(ev.dataTransfer.files);
    this.drag = false;
  }

  dragOver(ev) {
    ev.preventDefault();
  }

  dragStart(ev) {
    ev.preventDefault();
    this.drag = true;
  }

  dragEnd(ev) {
    ev.preventDefault();
    this.drag = false;
  }

}
