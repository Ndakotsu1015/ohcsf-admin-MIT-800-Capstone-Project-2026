import { Component, Input, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DeploymentEndpoint } from 'src/app/api/endpoints/deployment.endpoint';
import { MessageService } from 'primeng/api';
import { FormGroup } from '@angular/forms';
import { AppLoadingService } from 'src/app/store/services/app-loading.service';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { EnrollmentModule } from '../../enrollment.module';

@Component({
  selector: 'app-enrollment-preview',
  templateUrl: './enrollment-preview.component.html',
  styleUrls: ['./enrollment-preview.component.scss']
})

export class EnrollmentPreviewComponent {
  @Input() formData: any;
  @Input() avatarUrl: any;
  @Input() enrollmentForm: FormGroup;
  @Input() visible: boolean = false;
  @Output() formReset = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  @Output() visibleChange = new EventEmitter<boolean>();
  newForm: any;
  profile_photo:string=environment.apiUrl + '/file/get/';

  constructor(
    private deploymentEndpoint: DeploymentEndpoint,
        private messageService: MessageService,
        private readonly appLoadingService: AppLoadingService,
        
    
  ) {}
  confirmSubmission() {
    this.confirm.emit();

    this.newForm={
      title: this.formData.title,
      passport_file:this.formData.passport_file,
      first_name: this.formData.first_name,
      middle_name: this.formData.middle_name,
      last_name: this.formData.last_name,
      gender: this.formData.gender,
      marital_status: this.formData.marital_status,
      residential_address: this.formData.residential_address,
      permanent_address: this.formData.permanent_address,
      phone_number: this.formData.phone_number,
      nationality: this.formData.nationality,
      geopolitical_zone_id: this.formData.geopolitical_zone_id,
      state_id: this.formData.state_id,
      lga_id: this.formData.lga_id,
      unit_id: this.formData.unit_id,
      designation_id: this.formData.designation_id,
      email_address: this.formData.email_address,
      nin: this.formData.nin,
      ippis_no: this.formData.ippis_no,
      employee_no: this.formData.employee_no,
      cadre: this.formData.cadre,
      grade_level: this.formData.grade_level,
      qualification: this.formData.qualification,
      certification: this.formData.certification,
      date_of_birth: this.formData.date_of_birth,
      department_id:this.formData.department_id,
      division_id:this.formData.division_id,
      cadre_id:this.formData.cadre_id,
      branch_id:this.formData.branch_id,
      ministry_id:this.formData.ministry_id,
      grade_level_id:this.formData.grade_level_id,
      agency_id:this.formData.agency_id,
      is_redeployed: false,
      request_type: this.formData.request_type,
      employee_id: this.formData.employee_id,
      benefit: null,
      request_letter_file:null,
      status: 'Pending',
    }
    this.appLoadingService.startLoading('Creating deployment...');
    console.log('Form submitted:', this.formData);

    if(this.formData.id){
      this.deploymentEndpoint.update(this.newForm,this.formData.id).subscribe(response => {
        console.log('Response:', response);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Deployment created successfully.'
        });
        this.appLoadingService.stopLoading();
        
        this.visible=false;
      }, error => {
        console.error('Error creating deployment:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.message || 'Failed to create deployment.'
        });
        this.appLoadingService.stopLoading();
  
      })
    } else {

      this.deploymentEndpoint.create(this.newForm).subscribe(response => {
        console.log('Response:', response);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Deployment created successfully.'
        });
        this.appLoadingService.stopLoading();
        this.formReset.emit();
        this.visible=false;
      }, error => {
        console.error('Error creating deployment:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.message || 'Failed to create deployment.'
        });
        this.appLoadingService.stopLoading();
  
      })
    }
    ;
  }

  cancelSubmission() {
    this.cancel.emit();
  }

  onHide() {
    this.visibleChange.emit(false);
  }

  formatDate(dateString: string, yearOnly: boolean = false): string {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
  
    if (yearOnly) {
      return date.getFullYear().toString(); // Return only the year
    }
  
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }
}