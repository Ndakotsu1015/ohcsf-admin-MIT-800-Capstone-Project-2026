import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EscapeHtmlPipe } from './pipes/escape-html.pipe';
import { criteriaOptionsPipe } from './pipes/filter-pipe.pipe';
import { GroupByPipe } from './pipes/group-by.pipe';
import { Jsonpipe } from './pipes/jsonpipe.pipe';
import { KeysPipe } from './pipes/keys.pipe';
import { NilPipe } from './pipes/nil.pipe';
import { PositionPipe } from './pipes/position.pipe';
import { StaffStatusPipe } from './pipes/staffstatus.pipe';
import { XPipe } from './pipes/x.pipe';
import { YesNoPipe } from './pipes/YesNo.pipe';
import { DashboardElementsComponent } from './components/dashboard-elements/dashboard-elements.component';


import { DisplayLgaPipe, DisplayStatePipe } from './pipes/display-state.pipe';

import { FormatIfDatePipe } from './pipes/format-date';
import { ReportElementComponent } from './components/report-element/report-element.component';
import { ChartModule } from 'primeng/chart';


@NgModule({
  declarations: [
    KeysPipe,
    Jsonpipe,
    EscapeHtmlPipe, StaffStatusPipe, YesNoPipe, PositionPipe, NilPipe, XPipe,
    criteriaOptionsPipe,
    GroupByPipe,
    FormatIfDatePipe,
    DashboardElementsComponent,
    DisplayStatePipe, DisplayLgaPipe,
    ReportElementComponent
  ],
  imports: [
    CommonModule,
    ChartModule
  ],
  exports: [
    FormatIfDatePipe,
    PositionPipe,
    NilPipe,
    DashboardElementsComponent,
    DisplayStatePipe, DisplayLgaPipe,
    ReportElementComponent
  ]
})
export class SharedModule { }
