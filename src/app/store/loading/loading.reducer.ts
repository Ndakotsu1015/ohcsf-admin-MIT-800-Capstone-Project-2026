import { createReducer, on } from "@ngrx/store";
import { AppLoadingActions } from "./loading.action";
import { AppLoadingState } from "./loading.state";


export const appLoadingDefaultState: AppLoadingState = {
    state: false,
    label: null,
};

export const appLoadingReducer = createReducer(appLoadingDefaultState,
    on(AppLoadingActions.startLoading, (_, action) => ({ state: true, label: action.label })),
    on(AppLoadingActions.stopLoading, () => ({ state: false, label: null })),
)

