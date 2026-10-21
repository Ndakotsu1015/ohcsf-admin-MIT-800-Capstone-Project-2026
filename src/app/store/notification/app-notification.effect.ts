import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessageService } from "primeng/api";
import { catchError, map, of } from "rxjs";
import { AppNotificationActions } from "./notification.action";

@Injectable()
export class AppNotificationEffect {
    success$ = createEffect(() => this.actions$.pipe(
        ofType(AppNotificationActions.success),
        map(action => {
            this.messageService.add({ severity: 'success', summary: action.title, detail: action.message ?? undefined });
            return AppNotificationActions.none();
        }),
        catchError(() => of(AppNotificationActions.none)),
    ));

    error$ = createEffect(() => this.actions$.pipe(
        ofType(AppNotificationActions.error),
        map(action => {
            this.messageService.add({ severity: 'error', summary: action.title, detail: action.message ?? undefined, sticky: true });
            return AppNotificationActions.none();
        }),
        catchError(() => of(AppNotificationActions.none)),
    ));

    warning$ = createEffect(() => this.actions$.pipe(
        ofType(AppNotificationActions.warning),
        map(action => {
            this.messageService.add({ severity: 'warn', summary: action.title, detail: action.message ?? undefined });
            return AppNotificationActions.none();
        }),
        catchError(() => of(AppNotificationActions.none)),
    ));

    info$ = createEffect(() => this.actions$.pipe(
        ofType(AppNotificationActions.info),
        map(action => {
            this.messageService.add({ severity: 'info', summary: action.title, detail: action.message ?? undefined });
            return AppNotificationActions.none();
        }),
        catchError(() => of(AppNotificationActions.none)),
    ));

    constructor(
        private readonly actions$: Actions,
        private readonly messageService: MessageService,
    ) { }
}