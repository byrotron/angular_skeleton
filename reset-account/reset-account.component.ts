import { Component, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SktnAuthService } from './../app/auth.service';
import { ISktnResponse } from './../interfaces/interfaces';
import { SktnWebsitePanelService } from './../website-panel/website-panel.service';
import { ObservableMedia } from '@angular/flex-layout';
import { Observable } from 'rxjs';

@Component({
  selector: 'sktn-reset-account',
  templateUrl: './reset-account.component.html',
  styleUrls: [
    './reset-account.component.scss'
  ]
})
export class SktnResetAccountComponent {

  @Input()
  redirect = ['sign-in'];

  token: string;
  valid_token = false;
  error_message: string;

  constructor(
    public route: ActivatedRoute,
    protected website: SktnWebsitePanelService,
    public auth: SktnAuthService
  ) {}

  ngOnInit() {
    this.website.startLoading();
    console.log("Child");

    this.route.params.switchMap(
      (params: Params) => {
        if(params['token']) {
          this.token = params['token'];
          return this.auth.validToken(params['token']);
        } else {
          return Observable.of({
            status: false
          })
        }
      }
    ).subscribe(
      (response: ISktnResponse) => {
        if(response.status === true) {
          this.valid_token = true;
        } else {
          this.valid_token = false;
          this.error_message = response.result;
        }
        this.website.stopLoading();
      },
      (response: ISktnResponse) => {
        this.valid_token = false;
        this.error_message = response.result;
        this.website.stopLoading();
      }
    );
    
  }

  

}
