import { createReducer, on } from "@ngrx/store";
import { AppNotificationActions } from "./notification.action";
import { AppNotificationState, AppNotificationType } from "./notification.state";

const initialState: AppNotificationState = {
    type: AppNotificationType.NONE,
    title: null,
    message: null,
}

export const appNotificationReducer = createReducer(initialState,
    on(AppNotificationActions.none, () => ({ type: AppNotificationType.NONE, title: null, message: null })),
    on(AppNotificationActions.success, (_, action) => ({ type: AppNotificationType.SUCCESS, title: action.title, message: action.message })),
    on(AppNotificationActions.error, (_, action) => ({ type: AppNotificationType.ERROR, title: action.title, message: action.message })),
    on(AppNotificationActions.warning, (_, action) => ({ type: AppNotificationType.WARNING, title: action.title, message: action.message })),
    on(AppNotificationActions.info, (_, action) => ({ type: AppNotificationType.INFO, title: action.title, message: action.message })),
);