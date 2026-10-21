import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RedeploymentListComponent } from './pages/redeployment-list/redeployment-list.component';
import { RedeploymentRequestComponent } from './pages/redeployment-request/redeployment-request.component';

@NgModule({
    imports: [RouterModule.forChild([
        // { path: '', redirectTo: '/enrollment-' },
        { path: '', component: RedeploymentListComponent },
        { path: 'redeployment-request', component: RedeploymentRequestComponent }
    ])],
    exports: [RouterModule]
})
export class RedeploymentRoutingModule { }
