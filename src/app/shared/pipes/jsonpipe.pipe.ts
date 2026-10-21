import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jsonpipe'
})
export class Jsonpipe implements PipeTransform {

  transform(value: any, args:string[]) : any {
    try {
      return JSON.parse(value);
    } catch(e) {
      return [];
    }
  }
}
