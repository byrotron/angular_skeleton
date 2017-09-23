import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ucwords'
})
export class SktnUcWordsPipe implements PipeTransform {

  transform(str: string): string {
    return str.replace(/\w+/g, function(a){ 
      return a.charAt(0).toUpperCase() + a.slice(1).toLowerCase()
    })
  }

}