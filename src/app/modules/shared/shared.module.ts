import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentPreviewComponent } from '../enrollment/pages/enrollment-preview/enrollment-preview.component';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [EnrollmentPreviewComponent],
  imports: [
    CommonModule,
    DialogModule,
    CardModule,
    ButtonModule
  ],
  exports:[EnrollmentPreviewComponent]
})
export class SharedModule { }
