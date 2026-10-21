import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { AppNotificationActions } from '../../../store/notification/notification.action';
import { AuthService } from '../services/auth.service';
import { authSelectIsLoggedIn, authSelectUser } from 'src/app/store/auth/auth.selectors';
import { UserTypes } from 'src/app/api/enums/user-types';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private isLoggedIn = false;
  private userType?: string | null;

  /**
   *
   * @param {Router} _router
   * @param {AuthService} _authenticationService
   */
  constructor(
    private _router: Router,
    private _authenticationService: AuthService,
    private readonly appStore: Store<AppState>
  ) {
    this._authenticationService.isLoggedIn.subscribe({
      next: (isLoggedIn) => this.isLoggedIn = isLoggedIn,
    });
    this.appStore.select(authSelectUser).subscribe({
      next: (user) => {
        this.userType = user?.user_type;
      }
    });
  }

  //canActivate
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.isLoggedIn && this.userType === UserTypes.ADMIN) {
      return true;
    }

    setTimeout(() => {
      this.appStore.dispatch(
        AppNotificationActions.error({
          title: 'Unauthorized access!',
          message: 'Login to access this route!',
        })
      );
    }, 2500);

    return this._router.navigate(['/auth/login']);
  }
}
