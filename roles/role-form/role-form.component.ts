import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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
    public dialog: MatDialogRef<SktnRoleFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm();
   }

  ngOnInit() {

    if(this.data) {
      this.form.get('name').setValue(this.data.name);
    }

  }

  createForm() {
    this.form = this.fb.group({
      name: [null, Validators.required],
    });
  }

  create() {

    this.loading = true;

    let name = this.form.get('name').value;
    this.role.createRole(name).subscribe(
      (response: ISktnResponse) => {

        if(response.status === true) {
        
          this.dialog.close(response.result);
        
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
    this.role.updateRole(this.data.id, name).subscribe(
      (response: ISktnResponse) => {

        this.data.name = name;
        this.dialog.close(this.data);
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

    if(this.data) {
      this.update();
    } else {
      this.create();
    }

  }
  
}
