import { NgModule } from '@angular/core';
import {
    HashLocationStrategy,
    LocationStrategy,
    PathLocationStrategy,
} from '@angular/common';
import { AppComponent } from './app.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ProductService } from './service/product.service';
import { CountryService } from './service/country.service';
import { CustomerService } from './service/customer.service';
import { EventService } from './service/event.service';
import { IconService } from './service/icon.service';
import { NodeService } from './service/node.service';
import { PhotoService } from './service/photo.service';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { AuthModule } from './components/auth/auth.module';
import { LoginModule } from './components/auth/login/login.module';
import { AppState } from './store/app.state';
import { appReducer } from './store/app.reducer';
import { AppNotificationEffect } from './store/notification/app-notification.effect';
import { environment } from 'src/environments/environment';
import { UiModule } from './ui/ui.module';
import { FieldsetModule } from 'primeng/fieldset';
import { MessageService } from 'primeng/api';
import { httpInterceptorProviders } from './api/interceptors/interceptors';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EnrollmentModule } from './modules/enrollment/enrollment.module';
import { DeploymentModule } from './modules/deployment/deployment.module';
import { SharedModule } from './modules/shared/shared.module';
import { RedeploymentModule } from './modules/redeployment/redeployment.module';
import { TrackerModule } from './modules/tracker/tracker.module';

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        AppLayoutModule,
        DashboardModule,
        AuthModule,
        EnrollmentModule,
        DeploymentModule,
        SharedModule,
        RedeploymentModule,
        TrackerModule,
        LoginModule,
        StoreModule.forRoot<AppState>(appReducer),
        EffectsModule.forRoot([AppNotificationEffect]),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production,
            autoPause: true,
        }),
        UiModule,
    ],
    providers: [
        ...httpInterceptorProviders,
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        CountryService,
        CustomerService,
        EventService,
        IconService,
        NodeService,
        PhotoService,
        ProductService,
        MessageService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
