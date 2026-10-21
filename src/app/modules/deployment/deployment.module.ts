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
import { Table, TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { DeploymentListComponent } from './pages/deployment-list/deployment-list.component';
import { DeploymentRoutingModule } from './deployment-routing.module';
import { RippleModule } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';
import { DeploymentDetailComponent } from './pages/deployment-detail/deployment-detail.component';
import { ToastModule } from 'primeng/toast';
import { SkeletonModule } from 'primeng/skeleton';
import { DeploymentEditComponent } from './pages/deployment-edit/deployment-edit.component';
import { SharedModule } from '../shared/shared.module';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ReportingLogComponent } from './pages/reporting-log/reporting-log.component';

@NgModule({
    declarations: [
        DeploymentListComponent,
        DeploymentDetailComponent,
        DeploymentEditComponent,
        ReportingLogComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UiModule,
        TableModule,
        ButtonModule,
        InputGroupModule,
        InputTextModule,
        DeploymentRoutingModule,
        DropdownModule,
        CalendarModule,
        FormsModule,
        TableModule,
        PanelModule,
        RippleModule,
        ToolbarModule,
        ToastModule,
        SkeletonModule,
        SharedModule,
        OverlayPanelModule,
        InputGroupAddonModule,
        SkeletonModule
    ],
})
export class DeploymentModule {}
