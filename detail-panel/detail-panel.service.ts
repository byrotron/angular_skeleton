import { Injectable, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable()
export class SktnDetailPanelService {

  form: FormGroup;
  
  editing: boolean;

  submit: EventEmitter<boolean> = new EventEmitter();

}