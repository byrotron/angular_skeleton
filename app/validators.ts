import { Injectable } from '@angular/core';
import { Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable()
export class SktnValidators {

  number(control: AbstractControl): ValidationErrors|null {
    return !isNaN(+control.value) ? null : { number: true } 
  }

  matches(matched_control: string): ValidationErrors|null {

    return (control: AbstractControl): ValidationErrors | null => {
      let match = control.root.get(matched_control);
      console.log("Test");
      return match && control.value === match.value ? null : { match: 'Values do not match' } 
    };

  }

  password(control: AbstractControl): ValidationErrors|null {

    let alpha = new RegExp('[A-z]+');
    let numeric = new RegExp('[0-9]+');
    let symbols = new RegExp('[!@#$%^&*()-\+]+');
    let val = control.value;
    let errors = ['password is too weak'];

    if(val && alpha.test(val) && numeric.test(val) && symbols.test(val) && val.length >= 8) {
      return null;
    } else {

      if(!alpha.test(val)) {
        errors.push('must contain letters')
      }

      if(!numeric.test(val)) {
        errors.push('must contain numbers')
      } 

      if(!symbols.test(val)) {
        errors.push('must contain symbols')
      }

      if(!val || val.length < 8) {
        errors.push('must be longer than 8 chars')
      }

      return {'password': errors}; 
    }
  }

}