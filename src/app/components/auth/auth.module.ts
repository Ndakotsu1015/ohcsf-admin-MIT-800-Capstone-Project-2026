import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { PanelModule } from 'primeng/panel';
import { InputGroupModule } from 'primeng/inputgroup';
import { ButtonModule } from 'primeng/button';
import { LoginComponent } from './login/login.component';

@NgModule({
    declarations:[],
    imports: [
        CommonModule,
        AuthRoutingModule,
        PanelModule,
        InputGroupModule,
        ButtonModule

    ]
})
export class AuthModule { }
