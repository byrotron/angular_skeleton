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

  roles: ISktnRole[];
  current_user: ISktnUser;
  
  constructor(
    protected route: ActivatedRoute,
    protected fb: FormBuilder,
    public admin_panel: SktnAdminPanelService,
    public users: SktnUserService,
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
    this.admin_panel.startLoading();

    this.route.params.switchMap(
      (params: Params) => {
        return this.users.getUser(params["id"]);
      }
    ).switchMap(
      (response: ISktnResponse) => {
        this.current_user = response.result;
        return this.http_roles.getRoles();
      }
    ).subscribe(
      (response: ISktnResponse) => {

        if(response.status === true) {
          this.roles = response.result;
        } 
        this.setFormValues(this.current_user);
        this.admin_panel.stopLoading();

      }
    );

  }

  setFormValues(user: ISktnUser) {

    if(user) {
      this.form.get("name").setValue(user.name);
      this.form.get("surname").setValue(user.surname);
      this.form.get("email").setValue(user.email);
      this.form.get("status").setValue(user.status.id);
      this.form.get("role").setValue(user.role.id);
    }

  }

  update(e:any) {

    if(this.admin_panel.auth.getPrivilege('Users', 'update-user') === true) {
      this.loading = true;
      this.users.update(this.current_user.id, this.form.value).subscribe(
        (response: ISktnResponse) => {

          if(response.status === false) {
            this.setFormValues(this.current_user);
            this.admin_panel.addAdminMessage('warn', 'Warning', response.message);
          }

          this.loading = false;
          this.editing = false;
        },
        (response: ISktnResponse) => {
          this.admin_panel.messages.addErrorMessage('Update User Failed', response.message);
          this.loading = false;
          this.editing = false;
        }
      );
    }
    
  }


}
