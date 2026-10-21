import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DeploymentListComponent } from './pages/deployment-list/deployment-list.component';
import { DeploymentDetailComponent } from './pages/deployment-detail/deployment-detail.component';
import { DeploymentEditComponent } from './pages/deployment-edit/deployment-edit.component';
import { ReportingLogComponent } from './pages/reporting-log/reporting-log.component';


@NgModule({
    imports: [RouterModule.forChild([
        // { path: '', redirectTo: '/enrollment-' },
        { path: '', component: DeploymentListComponent },
        { path: 'reporting-log', component: ReportingLogComponent },
        { path: 'detail/:id', component: DeploymentDetailComponent },
        { path: 'edit/:id', component: DeploymentEditComponent }
    ])],
    exports: [RouterModule]
})
export class DeploymentRoutingModule { }
