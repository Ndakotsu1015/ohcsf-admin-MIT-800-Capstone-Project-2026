import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { UserResource } from "src/app/components/auth/auth.model";

export const AppAuthActions = createActionGroup({
    source: '[Authentication]',
    events: {
        'login': props<{ access_token: string, user: UserResource }>(),
        'update_user': props<UserResource>(),
        'logout': emptyProps(),
    },
});
