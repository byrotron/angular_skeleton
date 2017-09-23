import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';

import { ISktnResponse } from './../interfaces/interfaces';
import { SktnConfirmBoxComponent } from './../confirm-box/confirm-box.component';

import { ISktnRole } from './interfaces';

import { SktnAdminPanelService } from './../admin-panel/admin-panel.service';
import { SktnRoleService } from './role.service';

import { SktnRoleFormComponent } from './role-form/role-form.component';

@Component({
  selector: 'sktn-roles',
  templateUrl: './roles.component.html',
  styleUrls: [
    './roles.component.scss'
  ]
})
export class SktnRolesComponent implements OnInit {

  role_form: MdDialogRef<SktnRoleFormComponent>;

  confirm_form: MdDialogRef<SktnConfirmBoxComponent>;

  constructor(
    public router: Router,
    public role_service: SktnRoleService,
    public dialog: MdDialog
  ) { }

  ngOnInit() {
    // this.role_service.admin.loading = 'show';
    this.role_service.getRoles().subscribe(
      (response: ISktnResponse) => {
        if(response.status === true) {
          this.role_service.roles = response.result.roles;
          // this.role_service.admin.loading = 'hide';
        }
        this.role_service.setPrivileges();
      },
      (error: any) => {
        if(error.status === 403) {
          this.router.navigate(['/admin']);
        }
      },
      () => {
        // this.role_service.admin.loading = 'hide';
      }
    );

  }

  openForm(role: ISktnRole | undefined) {

      if(role) {
        if(role.enabled === false || this.role_service.actions.update) {
          return;
        }
        this.role_service.current_role = role;
      }

      this.role_form = this.dialog.open(SktnRoleFormComponent, {
        width: '600px',
      });

    
  }

  confirm(role: ISktnRole) {

    if(role.enabled === true && this.role_service.actions.update === true) {

      this.confirm_form = this.dialog.open(SktnConfirmBoxComponent, {
        width: '600px',
        data: 'Are you sure you want to delete: ' + role.name
      });

      this.confirm_form.afterClosed().subscribe(
        (result: boolean) => {
          if(result === true) {
            this.deleteRole(role);
          }
        }
      );

    }
    
  }

  deleteRole(role: ISktnRole) {

    if(role.enabled === true && this.role_service.actions.update === true) {

      this.role_service.deleteRole(role.id).subscribe(
        (response: ISktnResponse) => {

          if(response.status === true) {
            
            this.role_service.roles = this.role_service.roles.filter((delete_role: ISktnRole) => {
              return delete_role.id !== role.id;
            });

          }

        }
      );

    }

  }

}
