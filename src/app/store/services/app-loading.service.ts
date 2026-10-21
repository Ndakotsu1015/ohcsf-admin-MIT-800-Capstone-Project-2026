import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppLoadingActions } from "../loading/loading.action";
import { AppState } from "../app.state";

@Injectable({
    providedIn: 'root',
})
export class AppLoadingService {
    constructor(private readonly appStore: Store<AppState>) { }

    startLoading(label: string | null) {
        this.appStore.dispatch(AppLoadingActions.startLoading({ label }));
    }

    stopLoading() {
        this.appStore.dispatch(AppLoadingActions.stopLoading());
    }
}