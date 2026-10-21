import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { AppAuthActions } from 'src/app/store/auth/auth.action';
import {
    authSelectIsLoggedIn,
    authSelectUser,
} from 'src/app/store/auth/auth.selectors';
import { AppNotificationService } from 'src/app/store/services/app-notification.service';
import { environment } from 'src/environments/environment';
import {
    ChangePasswordRequest,
    loginrequest,
    ResendEmailRequestDto,
    ResetPasswordRequest,
    UserLogInDto,
    VerifyTokenRequestDto,
} from '../auth.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private isLoggedIn$ = this.appStore.select(authSelectIsLoggedIn);
    public user$ = this.appStore.select(authSelectUser);
    // confirmEmail: string | null = null;
    confirmEmailDetails: string[] | null = [];

    baseUrl = `${environment.apiUrl}`;

    constructor(
        private router: Router,
        private readonly httpClient: HttpClient,
        private appNotificationService: AppNotificationService,
        private readonly appStore: Store<AppState>
    ) { }

    login(requestPayload: loginrequest) {
        return this.httpClient
            .post<UserLogInDto>(`${this.baseUrl}/auth/login`, requestPayload)
            .pipe(
                map((data) => {
                    if (data.user && data.access_token) {
                        this.appStore.dispatch(
                            AppAuthActions.login({
                                access_token: data.access_token,
                                user: {
                                    id: data.user.id,
                                    email: data.user.email,
                                    name: data.user.name,
                                    profile_picture: data.user.profile_picture,
                                    user_type: data.user.user_type,
                                    is_active: data.user.is_active,
                                    email_verified: data.user.email_verified,
                                },
                            })
                        );

                        // Display welcome message!
                        setTimeout(() => {
                            this.appNotificationService.showSuccess({
                                title: `Welcome back, ${data.user.email}`,
                                detail:
                                    'You have successfully logged in to the OHCSF Portal. Enjoy!',
                            });
                        }, 2500);
                    }

                    return data.user;
                })
            );
    }

    resendEmail(data: ResendEmailRequestDto) {
        return this.httpClient.post<{}>(`${this.baseUrl}/auth/re-verify`, data);
    }

    verifyEmail(data: VerifyTokenRequestDto) {
        return this.httpClient.post<{}>(`${this.baseUrl}/auth/verify`, data);
    }

    resetPasswordRequest(email: string): Observable<boolean> {
        return this.httpClient.post<boolean>(
            `${this.baseUrl}/auth/reset-password/request`,
            email
        );
    }

    verifyPasswordResetToken(data: VerifyTokenRequestDto) {
        return this.httpClient.post<{}>(
            `${this.baseUrl}/auth/reset-password/verify`,
            data
        );
    }

    resetPassword(payload: ResetPasswordRequest): Observable<any> {
        console.log(payload);
        return this.httpClient.post<any>(
            `${this.baseUrl}/auth/reset-password`,
            payload
        );
    }

    logout() {
        this.httpClient.post(`${this.baseUrl}/auth/logout`, {}).subscribe({
            next: () => {
                this.appStore.dispatch(AppAuthActions.logout());
                this.router.navigate(['/auth/login']);
                setTimeout(() => {
                    this.appNotificationService.showSuccess({
                        title: 'See you next time!',
                        detail: 'You have successfully logged out!!',
                    });
                }, 2500);
            },
            error: (error) => {
                this.appNotificationService.showError({
                    title: 'Oops !!!',
                    detail: error.error.message,
                });
            },
        });
    }

    get isLoggedIn(): Observable<boolean> {
        return this.isLoggedIn$;
    }

    changePassword(payload: ChangePasswordRequest): Observable<any> {
        return this.httpClient.post<any>(
            `${this.baseUrl}/auth/change-password`,
            payload
        );
    }
}
