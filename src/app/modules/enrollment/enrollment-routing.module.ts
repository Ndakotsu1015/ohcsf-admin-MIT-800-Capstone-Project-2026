import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EnrollmentComponent } from './pages/enrollment/enrollment.component';

@NgModule({
    imports: [RouterModule.forChild([
        // { path: '', redirectTo: '/enrollment-' },
        { path: '', component: EnrollmentComponent }
    ])],
    exports: [RouterModule]
})
export class EnrollmentRoutingModule { }
