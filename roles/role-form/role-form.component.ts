import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdDialogRef } from '@angular/material';

import { SktnRoleService } from './../role.service';
import { SktnAdminPanelService } from './../../admin-panel/admin-panel.service';

import { ISktnResponse } from './../../interfaces/interfaces';

@Component({
  selector: 'sktn-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: [
    './role-form.component.scss'
  ]
})
export class SktnRoleFormComponent implements OnInit {

  loading = false;

  form: FormGroup;

  constructor(
    public fb: FormBuilder,
    public admin: SktnAdminPanelService,
    public role: SktnRoleService,
    public dialog: MdDialogRef<SktnRoleFormComponent>
  ) {
    this.createForm();
   }

  ngOnInit() {

    if(this.role.current_role) {
      this.form.get('name').setValue(this.role.current_role.name);
    }

    // Reset the current role if the form is closed
    this.dialog.afterClosed().subscribe(
      () => {
        this.role.current_role = undefined;
      }
    )

  }

  createForm() {
    this.form = this.fb.group({
      name: [
        "", Validators.required
      ],
    });
  }

  create() {

    this.loading = true;

    let name = this.form.get('name').value;
    this.role.createRole(name).subscribe(
      (response: ISktnResponse) => {

        if(response.status === true) {
        
          this.role.roles.push(response.result);
          this.dialog.close();
        
        }
        this.loading = false;
      },
      (err: Error) => {

        this.admin.addAdminMessage("error", "Error", err.message);
        this.loading = false;
      }
    );

  }

  update() {

    this.loading = true;

    let name = this.form.get('name').value;
    this.role.updateRole(this.role.current_role.id, name).subscribe(
      (response: ISktnResponse) => {

        this.role.current_role = undefined;
        this.dialog.close();
        this.loading = false;

      },
      (err: Error) => {

        this.admin.addAdminMessage("error", "Error", err.message);
        this.loading = false;
      }
    );

  }

  close() {
    this.dialog.close();
  }

  submit() {

    if(this.role.current_role) {
      this.update();
    } else {
      this.create();
    }

  }
  
}
