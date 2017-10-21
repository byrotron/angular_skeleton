import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';

import { SktnUserFormComponent } from './user-form/user-form.component';
import { SktnUserService } from './user.service';
import { SktnAdminPanelService } from './../admin-panel/admin-panel.service';
import { SktnDataTableSource, ISktnDataTableEvent } from './../data-table';
import { ISktnResponse } from './../interfaces/interfaces';
import { ISktnUser } from './interfaces';
import { SktnConfirmBoxComponent } from './../confirm-box';
import { FadeOut } from './../animations/animations';

@Component({
  selector: 'sktn-users',
  templateUrl: './users.component.html',
  styleUrls: [
    './users.component.scss'
  ],
  animations: [
    FadeOut
  ]
})
export class SktnUsersComponent {

  user_form: MdDialogRef<SktnUserFormComponent>;
  confirm_form: MdDialogRef<SktnConfirmBoxComponent>;

  total_items = 0;

  headers: string[] = ['edit', 'remove', 'name', 'surname', 'email', 'status', 'role', 'last_login'];

  data_source: SktnDataTableSource;

  constructor(
    protected router: Router,
    protected admin_panel: SktnAdminPanelService,
    protected dialog: MdDialog,
    public user_service: SktnUserService
  ) {}

  ngOnInit() {

    this.data_source = new SktnDataTableSource();
    this.updateTable({
      page: 1, 
      limit: 50, 
      orderby: 'surname', 
      direction: 'ASC'
    });

  }

  open_form() {
    if(this.admin_panel.auth.getPrivilege('create-user') === true) {
      this.user_form = this.dialog.open(SktnUserFormComponent, {
        width: '600px',
      });
    }
  }

  editUser(user: ISktnUser) {
    if(this.admin_panel.auth.getPrivilege('view-user') === true) {
      this.router.navigate([ '/admin', 'users', user.id ]);
    }
  }

  updateTable(event: ISktnDataTableEvent) {

    // this.user_service.admin.loading = 'show';
    this.user_service.getUsers(event)
      .subscribe(
        (response: ISktnResponse) => {
          if(response.status) {
            this.data_source.rows.next(response.result.users);
            this.total_items = response.result.total_items;
            this.admin_panel.stopLoading();
          }
        },
        (response: ISktnResponse) => {
          if(response.code === 401) {
            this.admin_panel.startError('unauthorized', response.message)
          }
        }
      );

  }

  confirm(user: ISktnUser) {
    
    if(this.admin_panel.auth.getPrivilege('delete-user') === true) {

      this.confirm_form = this.dialog.open(SktnConfirmBoxComponent, {
        width: '600px',
        data: 'Are you sure you want to delete: ' + user.name.toUpperCase() + ' ' + user.surname.toUpperCase() 
      });

      this.confirm_form.afterClosed().subscribe(
        (result: boolean) => {

          if(result === true) {
            this.deleteUser(user);
          }
          
        }
      );

    }
    
  }

  deleteUser(user: ISktnUser) {

    if(this.admin_panel.auth.getPrivilege('delete-user') === true) {

      this.user_service.delete(user.id).subscribe(
        (response: ISktnResponse) => {

          if(response.status === true) {
            this.user_service.users = this.user_service.users.filter((item: ISktnUser) => {
              return user.id !== item.id;
            });
          }

        }
      );

    }

  }

}
