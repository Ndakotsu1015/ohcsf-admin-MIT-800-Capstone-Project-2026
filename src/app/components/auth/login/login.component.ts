import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AppLoadingService } from 'src/app/store/services/app-loading.service';
import { loginrequest, Message } from '../auth.model';
import { AuthService } from '../services/auth.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
    valCheck: string[] = ['remember'];
    msgs: Message[] = [];
    password!: string;
    signinForm: FormGroup;

    constructor(public layoutService: LayoutService,
        private _formBuilder: FormBuilder,
        private readonly appLoadingService: AppLoadingService,
        private authService: AuthService,
        private readonly router: Router
    ) {
        this.signinForm = this._formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]

        })
    }

    showViaMessages(status: string, message: string) {
        this.msgs = [];
        this.msgs.push({
            severity: status,
            summary: '',
            detail: message,
        });
    }

    onSubmit() {
        if (this.signinForm.invalid) {
            return;
        }

        // Login
        const formData = this.signinForm.value;
        const credentials: loginrequest = {
            email: formData.email,
            password: formData.password,
        };
        this.appLoadingService.startLoading('Logging you in...');
        this.authService.login(credentials).subscribe({
            next: (data) => {
                this.appLoadingService.stopLoading();

                this.router.navigate(['/admin/dashboard']);
            },
            error: (data) => {
                this.appLoadingService.stopLoading();
                this.showViaMessages('error', data.error.message);
            },
        });
    }

    get fm() {
        return this.signinForm.controls;
    }

    passwordVisible = false;

togglePassword() {
    this.passwordVisible = !this.passwordVisible;
}
}
