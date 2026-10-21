import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'nil'
})
export class NilPipe implements PipeTransform {

	transform(value: any, ...args: unknown[]): unknown {
		if (value == null || value === '') {
			value = 'NIL';
		}
		return value;
	}
}
