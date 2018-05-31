import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { ISktnResponse } from './../interfaces/interfaces';
import { SktnConfirmBoxComponent } from './../confirm-box/confirm-box.component';

import { ISktnRole } from './interfaces';

import { SktnAdminPanelService } from './../admin-panel/admin-panel.service';
import { SktnRoleService } from './role.service';

import { SktnRoleFormComponent } from './role-form/role-form.component';
import { SktnDataTableSource, ISktnDataTableEvent } from './../data-table';

@Component({
  selector: 'sktn-roles',
  templateUrl: './roles.component.html',
  styleUrls: [
    './roles.component.scss'
  ]
})
export class SktnRolesComponent implements OnInit {

  role_form: MatDialogRef<SktnRoleFormComponent>;

  confirm_form: MatDialogRef<SktnConfirmBoxComponent>;

  total_items = 0;
  
  headers: string[] = ['edit', 'remove', 'name'];

  data_source: SktnDataTableSource;

  constructor(
    protected dialog: MatDialog,
    protected role_service: SktnRoleService,
    public admin_panel: SktnAdminPanelService,
  ) { }

  ngOnInit() {
    this.data_source = new SktnDataTableSource();

    this.updateTable({
      page: 1, 
      limit: 50, 
      orderby: 'surname', 
      direction: 'ASC'
    });

  }

  updateTable(event: ISktnDataTableEvent) {
    
    this.admin_panel.startLoading();
    this.role_service.getRoles().subscribe(
      (response: ISktnResponse) => {
        if(response.status === true) {
          this.data_source.rows.next(response.result);
          this.total_items = response.result.length;
          this.admin_panel.stopLoading();
        }
      },
      (response: ISktnResponse) => {
        if(response.code === 401) {
          this.admin_panel.startError('unauthorized');
        }
      }
    );

  }

  openForm(role: ISktnRole | null) {

      if(role) {
        if(role.enabled === false || this.admin_panel.auth.getPrivilege('Roles', 'update-role') === true) {
          return;
        }
        this.role_service.current_role = role;
      }

      this.role_form = this.dialog.open(SktnRoleFormComponent, {
        width: '600px',
      });

    
  }

  confirm(role: ISktnRole) {

    if(role.enabled === true && this.admin_panel.auth.getPrivilege('Roles', 'delete-role') === true) {

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

    if(role.enabled === true && this.admin_panel.auth.getPrivilege('Roles', 'delete-role') === true) {

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
