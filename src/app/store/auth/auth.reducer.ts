import { createReducer, on } from "@ngrx/store";
import { AppAuthActions } from "./auth.action";
import { AppAuthState } from "./auth.state";
import { UserResource } from "src/app/components/auth/auth.model";

const LOCAL_STORAGE_KEY_ACCESS_TOKEN = 'ohcsf_access_token';
const LOCAL_STORAGE_KEY_USER = 'ohcsf_user';

function validateUserFromLocalStorage(o: any): o is UserResource {
    return "id" in o && "email" in o && "user_type" in o;
}

function getAccessTokenFromLocalStorage(): string | null {
    const access_token = localStorage.getItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);
    return access_token;
}

function setAccessTokenToLocalStorage(access_token: string): void {
    localStorage.setItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN, access_token);
}

function getUserFromLocalStorage(): UserResource | null {
    const serialized_user = localStorage.getItem(LOCAL_STORAGE_KEY_USER);
    if (serialized_user) {
        const user = JSON.parse(serialized_user);
        if (validateUserFromLocalStorage(user)) {
            return user;
        }
    }
    return null;
}

function setUserToLocalStorage(user: UserResource): void {
    console.log('User to Local', user);

    localStorage.setItem(LOCAL_STORAGE_KEY_USER, JSON.stringify(user));
}

function removeAccessTokenFromLocalStorage(): void {
    localStorage.removeItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);
}

function removeUserFromLocalStorage(): void {
    localStorage.removeItem(LOCAL_STORAGE_KEY_USER);
}

export const defaultAppAuthState: AppAuthState = {
    access_token: getAccessTokenFromLocalStorage(),
    user: getUserFromLocalStorage(),
};

export const appAuthReducer = createReducer<AppAuthState>(defaultAppAuthState,
    on(AppAuthActions.login, (state, props) => {
        setAccessTokenToLocalStorage(props.access_token);
        setUserToLocalStorage(props.user);
        return {
            access_token: props.access_token,
            user: props.user
        };
    }), on(AppAuthActions.update_user, (state, props) => {
        setUserToLocalStorage(props);
        return {
            ...state,
            user: props
        };
    }),
    on(AppAuthActions.logout, (_) => {
        removeAccessTokenFromLocalStorage();
        removeUserFromLocalStorage();
        return {
            access_token: null,
            user: null
        };
    }),
);
