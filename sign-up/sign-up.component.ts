import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SktnWebsitePanelService } from './../website-panel/website-panel.service'
import { SktnAuthService }  from './../app/auth.service';
import { ISktnResponse } from './../interfaces/interfaces';

@Component({
  selector: 'sktn-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SktnSignUpComponent {

  signup_form:FormGroup;
  signingup = false;

  @Output()
  onSignUp: EventEmitter<any> = new EventEmitter();

  @Input()
  messages: string[] = [];

  constructor(
    public web: SktnWebsitePanelService,
    public form: FormBuilder
  ) { 
    this.createForm();
  }

  createForm() {
    
    this.signup_form = this.form.group({
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

  signup() {
    let email: string = this.signup_form.get('email').value;
    let password: string = this.signup_form.get('password').value;

    this.onSignUp.emit({
      email: email,
      password: password
    });

  }

  ngAfterViewInit() {
    this.web.loading = 'hide';
  }
}
