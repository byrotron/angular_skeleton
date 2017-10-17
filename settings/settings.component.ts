import { Component, OnInit } from '@angular/core';

import { SktnAdminPanelService } from './../admin-panel/admin-panel.service';

@Component({
  selector: 'sktn-settings',
  templateUrl: './settings.component.html',
  styleUrls: [
    './settings.component.scss'
  ]
})
export class SktnSettingsComponent implements OnInit {

  constructor(
    protected admin_panel: SktnAdminPanelService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.admin_panel.stopLoading();
  }

}
