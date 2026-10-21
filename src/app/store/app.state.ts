import { AppAuthState } from "./auth/auth.state";
import { AppLoadingState } from "./loading/loading.state";
import { AppNotificationState } from "./notification/notification.state";

export interface AppState {
    loading: AppLoadingState;
    notification: AppNotificationState;
    auth: AppAuthState;
}