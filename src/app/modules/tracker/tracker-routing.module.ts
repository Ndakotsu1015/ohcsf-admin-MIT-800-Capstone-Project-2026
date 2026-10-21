import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApprovedDeploymentsComponent } from './approved-deployments/approved-deployments.component';
import { RejectedDeploymentsComponent } from './rejected-deployments/rejected-deployments.component';
import { PendingDeploymentsComponent } from './pending-deployments/pending-deployments.component';

@NgModule({
    imports: [RouterModule.forChild([
        // { path: '', redirectTo: '/enrollment-' },
        { path: 'approved', component: ApprovedDeploymentsComponent },
        { path: 'rejected', component: RejectedDeploymentsComponent },
        { path: 'pending', component: PendingDeploymentsComponent },
    ])],
    exports: [RouterModule]
})
export class TrackerRoutingModule { }
