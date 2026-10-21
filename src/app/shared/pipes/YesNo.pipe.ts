import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yesno'
})
export class YesNoPipe implements PipeTransform {

  transform(value: any, args:string[]) : any {
    // if(value=="")
    //   value = 2;
    let statuses =[{status_id:1, status:"Yes"},{status_id:"", status:"No"} ,{status_id:0, status:"No"}];
    let state = statuses.filter(word => word.status_id == value);
    return state[0].status
  }
}
