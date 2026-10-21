import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const AppNotificationActions = createActionGroup({
    source: 'App Notification',
    events: {
        'None': emptyProps(),
        'Success': props<{ title: string, message: string | null }>(),
        'Error': props<{ title: string, message: string | null }>(),
        'Warning': props<{ title: string, message: string | null }>(),
        'Info': props<{ title: string, message: string | null }>(),
    }
});