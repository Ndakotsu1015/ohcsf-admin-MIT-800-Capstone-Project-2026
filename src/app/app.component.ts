import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { PrimeNGConfig } from 'primeng/api';
import { AppState } from './store/app.state';
import { LayoutService } from './layout/service/app.layout.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    title = 'client-tenant';
    appLoadingEvents$ = this.appStore.select((state) => state.loading);

    constructor(
        private readonly primengConfig: PrimeNGConfig,
        private readonly appStore: Store<AppState>,
    ) { }

    ngOnInit(): void {
        this.primengConfig.ripple = true; //enables core ripple functionality

        const scale = 12;
        //optional configuration with the default configuration

        document.documentElement.style.fontSize = scale + 'px';
    }
}
