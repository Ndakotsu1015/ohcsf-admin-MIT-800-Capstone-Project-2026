import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';

//import { PdfService } from 'src/app/services/pdf-service.service';
@Component({
    selector: 'app-report-element',
    templateUrl: './report-element.component.html',
    styleUrls: ['./report-element.component.css']
})
export class ReportElementComponent implements OnInit {

    // valueAxisDataType: string = 'numeric'
    constructor(/*public pdfExport: PdfService*/) {
        this.customizeTooltip = this.customizeTooltip.bind(this);
    }

    exportGrid(type) {
        // this.pdfExport.exportGrid(
        //     type,
        //     this.pivotGrid.instance,
        //     this.reportTitle + ' Report',
        //     'landscape',
        //     this.reportTitle + ' Report.pdf'
        // );
    }

    ngOnInit() {
        console.log('this is the child');
        
    }

    loadData() {
        //this.pivotGridDataSource.fields(this.fields);
        //this.pivotGridDataSource.load();
    }

    toggleChart() {
        // this.showChart = !this.showChart;
        // this.chartText = this.showChart ? 'Hide' : 'Show';
        // if (this.showChart) this.loadChart();
    }

    ngAfterViewInit() {
       //if (this.showChart) this.loadChart();
    }

    loadChart() {
        // setTimeout(() => {
        //     const dataSource = this.pivotGrid.instance.getDataSource();
        //     dataSource.expandAll(1);
        //     this.pivotGrid.instance.bindChart(this.chart.instance, {
        //         dataFieldsDisplayMode: 'splitPanes',
        //         alternateDataFields: true
        //     });
        // }, 10);
    }

    customizeTooltip(args) {
        return {
            html: args.seriesName + ' | Total <div>' + args.valueText + '</div>'
        };
    }
}
