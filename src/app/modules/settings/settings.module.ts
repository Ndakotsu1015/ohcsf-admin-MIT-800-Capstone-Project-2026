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
import { RippleModule } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { SkeletonModule } from 'primeng/skeleton';
import { SharedModule } from '../shared/shared.module';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { SettingsRoutingModule } from './settings-routing.module';
import { AgencyDetailsComponent } from './pages/agency/agency-details/agency-details.component';
import { AgencyEditComponent } from './pages/agency/agency-edit/agency-edit.component';
import { AgencyListComponent } from './pages/agency/agency-list/agency-list.component';
import { AgencyFormComponent } from './pages/agency/agency-form/agency-form.component';


@NgModule({
    declarations: [
        AgencyFormComponent,
        AgencyListComponent,
        AgencyEditComponent,
        AgencyDetailsComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UiModule,
        TableModule,
        ButtonModule,
        InputGroupModule,
        InputTextModule,
        SettingsRoutingModule,
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
export class SettingsModule {}
