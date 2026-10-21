import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'position'
})
export class PositionPipe implements PipeTransform {

	transform(value: any, ...args: unknown[]): string {
		const arr = ['th', 'st', 'nd', 'rd'];
		let pos = 'th';
		
		if (value % 100 < 11 || value % 100 > 13) {
			switch (value % 10) {
				case 1:
					pos = arr[1];
					break;
				case 2:
					pos = arr[2];
					break;
				case 3:
					pos = arr[3];
					break;
			}
		}
	
		return value + pos;
	}
	
}
