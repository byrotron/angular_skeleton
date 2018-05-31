import { Component, EventEmitter, Input } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SktnWebsitePanelService } from './../../website-panel/website-panel.service';
import { SktnAuthService } from './../../app/auth.service';

import { ISktnResponse } from './../../interfaces/interfaces';

@Component({ 
  selector: 'sktn-notification',
  templateUrl: './notification.component.html',
  styleUrls: [
    './notification.component.scss'
  ]
})
export class SktnNotificationComponent {

  form: FormGroup;
  loading = false;
  success = false;

  messages: string[] = [];

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected fb: FormBuilder,
    protected auth: SktnAuthService
  ) { 
    this.createForm();
  }

  createForm() {
    
    this.form = this.fb.group({
      email: [null, Validators.required]
    });

  }

  ngOnInit() {

  }

  reset() {

    this.form.markAsDirty();

    if(this.form.valid === true) {

      this.messages = [];
      this.loading = true;

      this.auth.resetNotification(this.form.value).subscribe(
        (response: ISktnResponse) => {

          if(response.status === true) {

            this.success = true;
            this.loading = false;
            
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
