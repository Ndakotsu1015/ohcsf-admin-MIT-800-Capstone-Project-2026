import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { PanelModule } from 'primeng/panel';
import { ReactiveFormsModule } from '@angular/forms';
import { UiModule } from 'src/app/ui/ui.module';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BadgeModule } from 'primeng/badge';
import { DeploymentModule } from '../deployment/deployment.module';
import { SharedModule } from '../shared/shared.module';
import { ApprovedDeploymentsComponent } from './approved-deployments/approved-deployments.component';
import { TrackerRoutingModule } from './tracker-routing.module';
import { PendingDeploymentsComponent } from './pending-deployments/pending-deployments.component';
import { RejectedDeploymentsComponent } from './rejected-deployments/rejected-deployments.component';

@NgModule({
    declarations: [ApprovedDeploymentsComponent, PendingDeploymentsComponent, RejectedDeploymentsComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UiModule,
        TableModule,
        ButtonModule,
        InputGroupModule,
        InputTextModule,
        TrackerRoutingModule,
        DropdownModule,
        CalendarModule,
        FormsModule,
        ProgressSpinnerModule,
        BadgeModule,
        SharedModule,
        DeploymentModule


    ]
})
export class TrackerModule { }
