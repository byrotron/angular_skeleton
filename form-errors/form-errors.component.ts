import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'sktn-form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.scss']
})
export class SktnFormErrorsComponent {

  @Input()
  element: FormControl;

  @Input()
  reactive: boolean = false;

  @Input()
  name: string;
  
}
