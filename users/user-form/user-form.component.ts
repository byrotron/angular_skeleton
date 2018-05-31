import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { MatDialogRef  } from '@angular/material';

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

  form: FormGroup;

  loading: boolean = false;

  roles: ISktnRole[] = [];

  constructor(
    public fb: FormBuilder,
    public user: SktnUserService,
    public role: SktnRoleService,
    public dialog: MatDialogRef<SktnUserFormComponent>
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.role.getRoles().subscribe(
      (response: ISktnResponse) => {
        this.roles = response.result;
      }
    )
  }

  createForm() {
    this.form = this.fb.group({
      name: ["", Validators.required],
      surname: "",
      email: "",
      status: "",
      role: ""
    });
  }

  close() {
    this.dialog.close();
  }
  
  submit() {
    
    this.loading = true;

    if(this.form.valid) {

      this.user.create(this.form.value).subscribe(
        (response: ISktnResponse) => {
          
          if(response.status === true) {
            this.user.users.push(response.result);
            this.dialog.close();
          } 
         
          this.loading = false;
          
  
        }
      );

    }
    

  }

}
