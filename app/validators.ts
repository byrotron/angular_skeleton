import { Injectable } from '@angular/core';
import { Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable()
export class SktnValidators {

  number(control: AbstractControl): ValidationErrors|null {
    return !isNaN(+control.value) ? null : { number: true } 
  }

}