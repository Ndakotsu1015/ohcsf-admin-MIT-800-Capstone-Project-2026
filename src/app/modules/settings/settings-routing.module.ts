import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AgencyListComponent } from './pages/agency/agency-list/agency-list.component';
import { AgencyFormComponent } from './pages/agency/agency-form/agency-form.component';
import { AgencyDetailsComponent } from './pages/agency/agency-details/agency-details.component';
import { AgencyEditComponent } from './pages/agency/agency-edit/agency-edit.component';
import { DepartmentEditComponent } from './pages/department/department-edit/department-edit.component';
import { DepartmentDetailsComponent } from './pages/department/department-details/department-details.component';
import { DepartmentFormComponent } from './pages/department/department-form/department-form.component';
import { MinistryEditComponent } from './pages/ministry/ministry-edit/ministry-edit.component';
import { MinistryDetailsComponent } from './pages/ministry/ministry-details/ministry-details.component';
import { MinistryFormComponent } from './pages/ministry/ministry-form/ministry-form.component';
import { MinistryListComponent } from './pages/ministry/ministry-list/ministry-list.component';
import { DepartmentListComponent } from './pages/department/department-list/department-list.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'agency-list', component: AgencyListComponent },
        { path: 'agency-form', component: AgencyFormComponent },
        { path: 'agency/detail/:id', component: AgencyDetailsComponent },
        { path: 'agency/edit/:id', component: AgencyEditComponent },

        { path: 'department-list', component: DepartmentListComponent },
        { path: 'department-form', component: DepartmentFormComponent },
        { path: 'department/detail/:id', component: DepartmentDetailsComponent },
        { path: 'department/edit/:id', component: DepartmentEditComponent },

        { path: 'ministry-list', component: MinistryListComponent },
        { path: 'ministry-form', component: MinistryFormComponent },
        { path: 'ministry/detail/:id', component: MinistryDetailsComponent },
        { path: 'ministry/edit/:id', component: MinistryEditComponent }
    ])],
    exports: [RouterModule]
})
export class SettingsRoutingModule { }
