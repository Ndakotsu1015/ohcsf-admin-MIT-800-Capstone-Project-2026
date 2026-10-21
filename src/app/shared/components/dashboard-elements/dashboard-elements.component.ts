import { PercentPipe } from '@angular/common';
import {
    Component,
    Input,
    OnInit,
    ViewChild,
    AfterViewInit,
} from '@angular/core';
// import { PdfService } from 'app/main/api/services/pdf.service';

@Component({
    selector: 'app-dashboard-elements',
    templateUrl: './dashboard-elements.component.html',
    styleUrls: ['./dashboard-elements.component.scss'],
})
export class DashboardElementsComponent implements OnInit, AfterViewInit {
    EmployeeTypes: { name: string; total: number }[] = [];
    @Input() data = { data: [], table_data: [] };
    data2 = [];
    chartOptions;
    pipe: any = new PercentPipe('en-US');
    popupVisible = false;

    public contentHeader: object;
    options: { indexAxis: string; };

    constructor() {}
    ngAfterViewInit(): void {
        let data2 = this.data.data;
        data2.forEach((item) => {
            item.data = this.formatData(item.data);
        });
        this.data2 = data2;
    }

    ngOnInit(): void {
        this.initChart();
    }

    generateColors(count) {
        const colors = [];
        for (let i = 0; i < count; i++) {
            const r = Math.floor(Math.random() * 255);
            const g = Math.floor(Math.random() * 255);
            const b = Math.floor(Math.random() * 255);
            colors.push(`rgba(${r}, ${g}, ${b}, 0.2)`); // Background color
            colors.push(`rgba(${r}, ${g}, ${b}, 1)`); // Border color
        }
        return colors;
    }

    formatData(inputData) {
        // Transform input data into basicData format
        let colors = this.generateColors(inputData.length);
        const basicData = {
            labels: inputData.map((item) => item.name), // Extract ministry names as labels
            datasets: [
                {
                    label: 'Total',
                    data: inputData.map((item) => item.total), // Extract totals as data
                    backgroundColor: colors.filter((_, i) => i % 2 === 0), // Even indices for background
                    borderColor: colors.filter((_, i) => i % 2 !== 0), // Odd indices for border
                    borderWidth: 1,
                },
            ],
        };
        this.chartOptions = {
            indexAxis: 'y'
        }

        console.log(basicData);
        return basicData;
    }
    initChart(){
        this.options = {
            indexAxis: 'y'
        }
    }

    createGroup(data: any[]): any[] {
        const formatedData: any[] = [];
        const maps = data.map((x) => x.name2);

        maps.forEach((item) => {
            const filteredData = data.filter((i) => i.name2 === item);
            const arr = { name: item, series: filteredData };
            formatedData.push(arr);
        });

        //console.log(formatedData);
        return formatedData;
    }
}
