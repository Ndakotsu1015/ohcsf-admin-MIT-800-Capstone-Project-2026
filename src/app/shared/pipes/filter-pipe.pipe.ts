import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'criteriaOptions'
})
export class criteriaOptionsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.filter((word: any) => word.CriteriaId == args);
  }

}
