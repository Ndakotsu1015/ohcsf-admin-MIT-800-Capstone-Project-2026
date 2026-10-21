import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DashboardsRoutingModule } from './dashboard-routing.module';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { EnrollmentModule } from 'src/app/modules/enrollment/enrollment.module';
import { DeploymentModule } from 'src/app/modules/deployment/deployment.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TrackerModule } from 'src/app/modules/tracker/tracker.module';

@NgModule({
    imports: [
        CommonModule,
        ChartModule,
        MenuModule,
        TableModule,
        ButtonModule,
        StyleClassModule,
        PanelMenuModule,
        DashboardsRoutingModule,
        InputGroupModule,
        InputGroupAddonModule,
        InputTextModule,
        DropdownModule,
        DeploymentModule,
        EnrollmentModule,
        TrackerModule,
        SharedModule,
    ],
    declarations: [DashboardComponent],
    exports: [DashboardComponent],
})
export class DashboardModule {}
