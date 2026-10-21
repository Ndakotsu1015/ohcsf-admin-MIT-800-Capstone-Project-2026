import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const AppLoadingActions = createActionGroup({
    source: 'UI Loading',
    events: {
        'Start Loading': props<{ label: string | null }>(),
        'Stop Loading': emptyProps(),
    }
});