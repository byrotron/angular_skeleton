import { Component, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SktnWebsitePanelService } from './../website-panel/website-panel.service';
import { SktnAuthService } from './../app/auth.service';

import { ISktnResponse } from './../interfaces/interfaces';

@Component({
  selector: 'sktn-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.scss'
  ]
})
export class SktnLoginComponent {

  login_form: FormGroup;
  logging_in = false;

  messages: string[] = [];

  constructor(
    public router: Router,
    public form: FormBuilder,
    public auth: SktnAuthService
  ) { 
    this.createForm();
  }

  createForm() {
    
    this.login_form = this.form.group({
      email: [
        '', 
        Validators.required
      ],
      password: [
        '', 
        Validators.required
      ]
    });

  }

  login() {

    this.login_form.get("email").markAsDirty();
    this.login_form.get("password").markAsDirty();

    if(this.login_form.valid === true) {

      this.messages = [];
      this.logging_in = true;
      let email: string = this.login_form.get('email').value;
      let password: string = this.login_form.get('password').value;

      this.auth.login(email, password).subscribe(
        (response: ISktnResponse) => {

          if(response.status === true) {

            this.auth.current_user = response.result;
            this.router.navigate(['/admin']);

          } else {

            this.messages.push(response.message);
            this.login_form.reset();
            this.logging_in = false;
            
          }

        },
        (response: ISktnResponse) => {

          this.messages.push(response.message);
          this.logging_in = false;
          this.login_form.reset();

        }
      );
    
    }

  }

}
