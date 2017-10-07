import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';

import { SktnUserFormComponent } from './user-form/user-form.component';
import { SktnUserService } from './user.service';
import { SktnAdminPanelService } from './../admin-panel/admin-panel.service';
import { SktnDataTableSource, ISktnDataTableEvent } from './../data-table';
import { ISktnResponse } from './../interfaces/interfaces';
import { ISktnUser } from './interfaces';

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

  total_items = 0;

  headers: string[] = ['name', 'surname', 'email', 'status', 'role', 'last_login'];

  data_source: SktnDataTableSource;

  constructor(
    public router: Router,
    public user_service: SktnUserService,
    public dialog: MdDialog
  ) {}

  ngOnInit() {

    this.data_source = new SktnDataTableSource();
    this.updateTable({
      page: 1, 
      limit: 50, 
      orderby: 'surname', 
      direction: 'ASC'
    });
    this.user_service.setPrivileges();

  }

  open_form() {
    if(this.user_service.actions.create === true) {
      this.user_form = this.dialog.open(SktnUserFormComponent, {
        width: '600px',
      });
    }
  }

  editUser(user: ISktnUser) {
    if(this.user_service.actions.read === true) {
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
          }
        },
        (error: any) => {
          if(error.status === 403) {
            this.router.navigate(['/admin']);
          }
        }
      );

  }

  ngAfterViewInit() {
    // this.user_service.admin.loading = 'hide';
  }

  deleteUser(user: ISktnUser) {

    if(this.user_service.actions.delete === true) {

      this.user_service.delete(user.id).subscribe(
        (response: ISktnResponse) => {
          if(response.status === true) {
            this.user_service.users = this.user_service.users.filter((item: ISktnUser) => {

              return user.id !== item.id;

            })
          }
        }
      );

    }

  }

}
