import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: DashboardComponent },
        { path: 'enrollment', loadChildren: () => import('../../modules/enrollment/enrollment.module').then(m => m.EnrollmentModule) },
        { path: 'deployment', loadChildren: () => import('../../modules/deployment/deployment.module').then(m => m.DeploymentModule) },

        { path: 'reporting-log', loadChildren: () => import('../../modules/deployment/deployment.module').then(m => m.DeploymentModule) },
        { path: 'redeployment', loadChildren: () => import('../../modules/redeployment/redeployment.module').then(m => m.RedeploymentModule) },
        {path: 'settings', loadChildren: () => import('../../modules/settings/settings.module').then(m => m.SettingsModule)},

        { path: 'tracker', loadChildren: () => import('../../modules/tracker/tracker.module').then(m => m.TrackerModule) },
        // { path: 'redeployment-log', loadChildren: () => import('../../modules/redeployment/reporting-log.module').then(m => m.RedeploymentLogModule) },

    ])],
    exports: [RouterModule]
})
export class DashboardsRoutingModule { }
