import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UiModule } from 'src/app/ui/ui.module';

@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        LoginRoutingModule,
        UiModule,
    ],
    exports: [LoginComponent]
})
export class LoginModule { }
