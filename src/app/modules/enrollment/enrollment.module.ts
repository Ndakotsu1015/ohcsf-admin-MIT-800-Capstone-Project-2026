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
import { EnrollmentComponent } from './pages/enrollment/enrollment.component';
import { TableModule } from 'primeng/table';
import { EnrollmentRoutingModule } from './enrollment-routing.module';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BadgeModule } from 'primeng/badge';
import { EnrollmentPreviewComponent } from './pages/enrollment-preview/enrollment-preview.component';
import { DeploymentModule } from '../deployment/deployment.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [EnrollmentComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UiModule,
        TableModule,
        ButtonModule,
        InputGroupModule,
        InputTextModule,
        EnrollmentRoutingModule,
        DropdownModule,
        CalendarModule,
        FormsModule,
        ProgressSpinnerModule,
        BadgeModule,
        SharedModule,
        DeploymentModule


    ]
})
export class EnrollmentModule { }
