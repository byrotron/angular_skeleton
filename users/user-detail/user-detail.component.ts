import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

import { SktnUserService } from './../user.service';
import { SktnAdminPanelService } from './../../admin-panel/admin-panel.service';

import { ISktnResponse } from './../../interfaces/interfaces';
import { ISktnUser } from './../interfaces';

@Component({
  selector: 'sktn-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: [
    './user-detail.component.scss'
  ]
})
export class SktnUserDetailComponent implements OnInit {

  user_form: FormGroup;

  editing = false;

  loading = false;

  updater: any;
  
  constructor(
    protected route: ActivatedRoute,
    protected form: FormBuilder,
    protected admin_panel: SktnAdminPanelService,
    public user: SktnUserService
  ) {
    this.createForm();
   }

  createForm() {
    this.user_form = this.form.group({
      name: ["", Validators.required],
      surname: ["", Validators.required],
      email: ["", Validators.required],
      status: ["", Validators.required],
      role: ["", Validators.required]
    });
  }

  ngOnInit() {

    this.route.params.subscribe(

      (params: Params) => {

        this.user.getUser(params["id"]).subscribe(
          (response: ISktnResponse) => {

            if(response.status === true) {
              
              this.setFormValues(response.result);
              this.user.current_user = response.result;
              this.user.setPrivileges();
            
            } 

          }

        );

      },
     
    );
  }

  setFormValues(user: ISktnUser) {

    for(let element in user) {

      if(this.user_form.contains(element)) {

        this.user_form.get(element).setValue(user[element]);

      }

    }

  }

  update_user() {

    for(let element in this.user.current_user) {

      if(this.user_form.contains(element)) {

        this.user.current_user[element] = this.user_form.get(element).value;

      }

    }

  }

  update(e:any) {

    if(this.user.actions.update === true) {
      this.loading = true;
      this.user.update(this.user.current_user.id, this.user_form.value).subscribe(
        (response: ISktnResponse) => {

          if(response.status === true) {

            // Update the current user with new information
            this.update_user();
            // Then reset the form
            this.user_form.reset();
            // Re-insert the values into the form
            this.setFormValues(this.user.current_user);

            this.editing = false;
            this.loading = false;

          } else {

            this.admin_panel.addAdminMessage('warn', 'Warning', response.message);

          }

        }
      );
    }
    
  }
  
  ngOnDestroy() {
    this.user.current_user = undefined;
  }

}
