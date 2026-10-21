import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'x'
})
export class XPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
