import { Injectable } from '@angular/core';

@Injectable()
export class BreadcrumbService {

  urls: {name: string; url: string}[] = [];
  mappings: any = {};

}