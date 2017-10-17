import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'sktn-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class SktnFormComponent {

  @Input()
  title: string;

  @Output()
  onClose: EventEmitter<boolean> = new EventEmitter();

  close() {
    this.onClose.emit(true);
  }

}
