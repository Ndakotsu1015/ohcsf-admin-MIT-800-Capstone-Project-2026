import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'display_state'
})
export class DisplayStatePipe implements PipeTransform {

	transform(value: any, ...args: unknown[]): unknown {

		if (value == "FCT" || value === 'Federal Capital Teritory') {
			value = '';
		}
		else
			value = 'State';

		return value;
	}
}

@Pipe({
	name: 'display_lga'
})
export class DisplayLgaPipe implements PipeTransform {

	transform(value: any, ...args: unknown[]): unknown {

		if (value == "FCT" || value === 'Federal Capital Teritory') {
			value = 'Area Council';
		}
		else
			value = 'Local Government Area';

		return value;
	}
}
