import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

import { SktnUserService } from './../user.service';
import { SktnAdminPanelService } from './../../admin-panel/admin-panel.service';

import { ISktnResponse } from './../../interfaces/interfaces';
import { ISktnUser } from './../interfaces';
import { SktnRoleService } from './../../roles/role.service';
import { ISktnRole } from './../../roles/interfaces';

@Component({
  selector: 'sktn-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: [
    './user-detail.component.scss'
  ]
})
export class SktnUserDetailComponent implements OnInit {

  form: FormGroup;

  editing = false;

  loading = false;

  updater: any;

  roles: ISktnRole[];
  
  constructor(
    protected route: ActivatedRoute,
    protected fb: FormBuilder,
    protected admin_panel: SktnAdminPanelService,
    public user: SktnUserService,
    protected http_roles: SktnRoleService
  ) {
    this.createForm();
   }

  createForm() {
    this.form = this.fb.group({
      name: [null, Validators.required],
      surname: [null, Validators.required],
      email: [null, Validators.required],
      status: [null, Validators.required],
      role: [null, Validators.required]
    });
  }

  ngOnInit() {

    this.route.params.switchMap(
      (params: Params) => {
        return this.user.getUser(params["id"]);
      }
    ).switchMap(
      (response: ISktnResponse) => {
        this.user.current_user = response.result;
        return this.http_roles.getRoles();
      }
    ).subscribe(
      (response: ISktnResponse) => {

        if(response.status === true) {

          this.roles = response.result;
          this.setFormValues(response.result);
          this.user.setPrivileges();
        
        } 

        this.admin_panel.stopLoading();

      }
    );

  }

  setFormValues(user: ISktnUser) {

    if(this.user.current_user) {
      this.form.get("name").setValue(this.user.current_user.name);
      this.form.get("surname").setValue(this.user.current_user.surname);
      this.form.get("email").setValue(this.user.current_user.email);
      this.form.get("status").setValue(this.user.current_user.status.id);
      this.form.get("role").setValue(this.user.current_user.role.id);
    }

  }

  update_user() {

    for(let element in this.user.current_user) {

      if(this.form.contains(element)) {

        this.user.current_user[element] = this.form.get(element).value;

      }

    }

  }

  update(e:any) {

    if(this.user.actions.update === true) {
      this.loading = true;
      this.user.update(this.user.current_user.id, this.form.value).subscribe(
        (response: ISktnResponse) => {

          if(response.status === true) {

            // Update the current user with new information
            this.update_user();
            // Then reset the form
            this.form.reset();
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
