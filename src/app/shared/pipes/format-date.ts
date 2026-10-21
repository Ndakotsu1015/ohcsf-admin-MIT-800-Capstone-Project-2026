import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatIfDate'
})
export class FormatIfDatePipe implements PipeTransform {

    transform(value: any, dateFormat: string = 'yyyy-MM-dd'): any {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
            return this.formatDate(date, dateFormat);
        }
        return value;
    }

    private formatDate(date: Date, format: string): string {
        const map = {
            'yyyy': date.getFullYear(),
            'yy': String(date.getFullYear()).slice(-2),
            'MM': ('0' + (date.getMonth() + 1)).slice(-2),
            'dd': ('0' + date.getDate()).slice(-2),
            'HH': ('0' + date.getHours()).slice(-2),
            'mm': ('0' + date.getMinutes()).slice(-2),
            'ss': ('0' + date.getSeconds()).slice(-2),
        };

        return format.replace(/yyyy|yy|MM|dd|HH|mm|ss/gi, (matched) => map[matched]);
    }

}
