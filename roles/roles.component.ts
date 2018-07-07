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

  confirm_form: MatDialogRef<SktnConfirmBoxComponent>;

  roles: ISktnRole[] = [];
  total_items = 0;
  
  headers: string[] = ['edit', 'remove', 'name'];

  data_source: SktnDataTableSource;

  loading = false;

  constructor(
    protected dialog: MatDialog,
    protected role_service: SktnRoleService,
    public admin_panel: SktnAdminPanelService,
  ) { }

  ngOnInit() {
    this.data_source = new SktnDataTableSource();
    this.tableSetup();
  }

  tableSetup() {
    this.updateTable({
      page: 1, 
      limit: 50, 
      orderby: 'surname', 
      direction: 'ASC'
    });
  }

  updateTable(event: ISktnDataTableEvent) {
    
    this.loading = true;

    this.role_service.getRoles().subscribe(
      (response: ISktnResponse) => {
        if(response.status === true) {
          this.roles = response.result;
          this.data_source.rows.next(this.roles);
          this.total_items = response.result.length;
          this.loading = false;
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

  findRole(role: ISktnRole) {
    return this.roles.findIndex((item: ISktnRole) => {
      return role.id === item.id;
    })
  }

  createRole() {
    if(this.admin_panel.auth.getPrivilege('Roles', 'create-role') === true) {

      let form = this.dialog.open(SktnRoleFormComponent, {
        width: '600px'
      });
      
      form.afterClosed().subscribe((role: ISktnRole) => {
        this.roles.push(role);
        this.data_source.rows.next(this.roles);
      });
      
    }
  }

  updateRole(role: ISktnRole) {
    if(role.enabled === true && this.admin_panel.auth.getPrivilege('Roles', 'update-role') === true) {

      let form = this.dialog.open(SktnRoleFormComponent, {
        width: '600px',
        data: role
      });
      
      form.afterClosed().subscribe((role: ISktnRole) => {
        let ind = this.findRole(role);
        this.roles[ind] = role
        this.data_source.rows.next(this.roles);
      });
      
    }
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

      this.roles = this.roles.filter((item: ISktnRole) => {
        return role.id !== item.id;
      });
      this.data_source.rows.next(this.roles);
      this.total_items--;

      this.role_service.deleteRole(role.id).subscribe(
        (response: ISktnResponse) => {

          if(response.status === false) {
            this.admin_panel.messages.addErrorMessage('Role Delete Failed', response.message);
            this.tableSetup()
          }

        },
        (response: ISktnResponse) => {
          this.admin_panel.messages.addErrorMessage('Role Delete Failed', response.message);
          this.tableSetup();
        }
      );

    }

  }

}
