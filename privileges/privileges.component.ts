import { Component, OnInit } from '@angular/core';
import { MdSlideToggleChange  } from '@angular/material';
import { Router } from '@angular/router';

import { ISktnResponse } from './../interfaces/interfaces';

import { SktnAdminPanelService } from './../admin-panel/admin-panel.service';
import { SktnPrivilegesService } from './privileges.service';
import { ISktnController, ISktnPrivilege } from './interfaces';
import { ISktnRole } from './../roles/interfaces';

@Component({
  selector: 'sktn-privileges',
  templateUrl: './privileges.component.html',
  styleUrls: [
    './privileges.component.scss'
  ]
})
export class SktnPrivilegesComponent implements OnInit {

  loading = false;

  data: any[] = [];

  controllers: ISktnController[];

  privileges: ISktnPrivilege[];

  roles: ISktnRole[];

  constructor(
    protected admin: SktnAdminPanelService,
    protected privs: SktnPrivilegesService,
    protected router: Router
  ) { }

  ngOnInit() {
    // this.admin.loading = 'show';

    this.privs.getPrivileges().subscribe(
      (response: ISktnResponse) => {

        if(response.status === true) {
          this.controllers = response.result.controllers;
          this.roles = response.result.roles
          this.privileges = response.result.privileges
          this.privs.setPrivileges();
        }

        this.set_data();

      },
      (error: any) => {
        if(error.status === 403) {
          this.router.navigate(['/admin']);
        }
      },
      () => {
        // this.admin.loading = 'hide';
      }
    );

  }

  find_privilege_status(action: number, role: number): boolean {

    let privlege = this.privileges.find((item: any) => {
      return item.action_id === action && item.role_id === role;
    })
    return privlege.status;
  
  }

  update_privilege(slide:MdSlideToggleChange, action: number, role: number) {

    this.privs.updatePrivilege(action, role, slide.checked).subscribe(
      (response: ISktnResponse) => {
        return true;
      },
      (err: Error) => {
        this.admin.addAdminMessage('warn', "Warning", err.message);

        this.privileges.map((item: any) => {
            if(item.action_id === action && item.role_id === role) {
              item.status = !item.status;
            }
            return item;
        });

      }
    );

  }

  set_data() {
    let data = [];

    for(let priv of this.controllers) {

      var obj = {
        id: priv.id,
        name: priv.controller,
        label: priv.label,
        description: priv.description,
        roles: []
      }

      for(let role of this.roles) {
        
        let new_role:any = {
          id: role.id,
          name: role.name,
          enabled: role.enabled,
          actions: priv.actions
        };

        obj.roles.push(new_role);

      }
      
      data.push(obj);

    }

    this.data = data;

  }

}
