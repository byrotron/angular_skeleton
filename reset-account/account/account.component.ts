import { Component, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SktnWebsitePanelService } from './../../website-panel/website-panel.service';
import { SktnAuthService } from './../../app/auth.service';

import { ISktnResponse } from './../../interfaces/interfaces';
import { SktnValidators } from 'pangular';

@Component({ 
  selector: 'sktn-account',
  templateUrl: './account.component.html',
  styleUrls: [
    './account.component.scss'
  ]
})
export class SktnAccountComponent {

  @Input()
  redirect = ['sign-in'];

  @Input()
  token: string;

  form: FormGroup;
  loading = false;

  messages: string[] = [];

  constructor(
    protected router: Router,
    protected fb: FormBuilder,
    protected auth: SktnAuthService,
    protected validators: SktnValidators
  ) { 
    this.createForm();
  }

  createForm() {
    
    this.form = this.fb.group({
      password: [null, [Validators.required, this.validators.password]],
      confirm_password: [null, [Validators.required, this.validators.matches('password')]],
      token: [null, Validators.required]
    });

  }

  ngOnChanges() {
    this.form.get('token').setValue(this.token);
  }

  reset() {

    this.form.markAsDirty();

    if(this.form.valid === true) {

      this.messages = [];
      this.loading = true;

      this.auth.resetAccount(this.form.value).subscribe(
        (response: ISktnResponse) => {

          if(response.status === true) {

            this.router.navigate(this.redirect);

          } else {

            this.messages.push(response.message);
            this.form.reset();
            this.loading = false;
            
          }

        },
        (response: ISktnResponse) => {

          this.messages.push(response.message);
          this.loading = false;
          this.form.reset();

        }
      );
    
    }

  }

}
