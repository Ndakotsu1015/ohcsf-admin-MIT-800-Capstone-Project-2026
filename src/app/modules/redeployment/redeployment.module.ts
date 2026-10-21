import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedeploymentListComponent } from './pages/redeployment-list/redeployment-list.component';
import { RedeploymentRoutingModule } from './redeployment-routing.module';
import { PanelModule } from 'primeng/panel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { OverlayModule } from 'primeng/overlay';
import { OverlayPanelModule } from 'primeng/overlaypanel';

import { RedeploymentRequestComponent } from './pages/redeployment-request/redeployment-request.component';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';


@NgModule({
    declarations: [RedeploymentListComponent, RedeploymentRequestComponent],
    imports: [
       CommonModule,
       RedeploymentRoutingModule,
       PanelModule,
       FormsModule,
       ReactiveFormsModule,
       DropdownModule,
       TableModule,
       ButtonModule,
       OverlayModule,
       OverlayPanelModule,
       DialogModule,
       ToastModule,
       TagModule
       

    ],
})

export class RedeploymentModule{}