import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { MdDialogRef  } from '@angular/material';

import { SktnUserService } from './../user.service';
import { SktnRoleService } from './../../roles/role.service';
import { ISktnRole } from './../../roles/interfaces';

import { ISktnResponse } from './../../interfaces/interfaces';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class SktnUserFormComponent {

  user_form: FormGroup;

  loading: boolean = false;

  roles: ISktnRole[] = [];

  constructor(
    public form: FormBuilder,
    public user: SktnUserService,
    public role: SktnRoleService,
    public dialog: MdDialogRef<SktnUserFormComponent>
  ) {
    this.createForm();
  }

  createForm() {
    this.user_form = this.form.group({
      name: [
        "", Validators.required
      ],
      surname: "",
      email: "",
      status: "",
      role: ""
    });
  }
  
  submit() {
    
    this.loading = true;

    this.user.create(this.user_form.value).subscribe(
      (response: ISktnResponse) => {

        this.user.users.push(response.result);
        this.dialog.close();

      },
      (err: Error) => {

      },
      () =>{
        this.loading = false;
      }
    );

  }

}
