import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { AppAuthState } from './auth.state';

export const authSelect = (state: AppState) => state.auth;

// Access Token
export const authSelectAccessToken = createSelector(
  authSelect,
  (state: AppAuthState) => state.access_token
);

// User
export const authSelectUser = createSelector(
  authSelect,
  (state: AppAuthState) => state.user
);

// Is User Logged In
export const authSelectIsLoggedIn = createSelector(
  authSelect,
  (state: AppAuthState) => state.user !== null
);

// Is User Logged In
export const authSelectUserAvatar = createSelector(
  authSelect,
  (state: AppAuthState) => state.user?.profile_picture
);
