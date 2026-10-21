import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DeploymentEndpoint } from 'src/app/api/endpoints/deployment.endpoint';
import { environment } from 'src/environments/environment';

interface Qualification {
  qualification: string;
  institution: string;
  year: Date;
}

interface Certification {
  certification: string;
  year: Date;
}
@Component({
  selector: 'app-deployment-detail',
  templateUrl: './deployment-detail.component.html',
  providers: [MessageService],
  styleUrls: ['./deployment-detail.component.scss']
})
export class DeploymentDetailComponent implements OnInit {
  deploymentData: any;
  loading: boolean = true;
  deploymentId: number;
  profile_photo:string=environment.apiUrl + '/file/get/';
  qualifications: Qualification[] = [];
  certifications: Certification[] = [];


  constructor(
    private route: ActivatedRoute,
    private deploymentEndpoint: DeploymentEndpoint,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.deploymentId = this.route.snapshot.params['id'];
    this.loadDeploymentDetail();
  }

  loadDeploymentDetail() {
    this.loading = true;
    this.deploymentEndpoint.single(this.deploymentId).subscribe({
      next: (response) => {
        this.deploymentData = response.data;
        this.loading = false;
        if (this.deploymentData.qualification) {
          let newQual;
        
          // Check if qualification is a string (stringified array)
          if (typeof this.deploymentData.qualification === 'string') {
            try {
              const qualificationString = this.deploymentData.qualification.replace(/'/g, '"');
              newQual = JSON.parse(qualificationString);
            } catch (error) {
              console.error('Error parsing qualification:', error);
              newQual = []; // Fallback to empty array if parsing fails
            }
          } 
          // If it's already an array, use it directly
          else if (Array.isArray(this.deploymentData.qualification)) {
            newQual = this.deploymentData.qualification;
          } else {
            newQual = []; // Fallback in case of unexpected data type
          }
        
          // Process the qualifications
          this.qualifications = newQual.map(q => ({
            qualification: q.qualification,
            institution: q.institution,
            year: new Date(q.year)
          }));
        
          console.log('qualification', this.qualifications);
        }
        
        
        if (this.deploymentData.certification) {
          let newCert;
        
          // Check if certification is a string (stringified array)
          if (typeof this.deploymentData.certification === 'string') {
            try {
              const certificationString = this.deploymentData.certification.replace(/'/g, '"');
              newCert = JSON.parse(certificationString);
            } catch (error) {
              console.error('Error parsing certification:', error);
              newCert = []; // Fallback to empty array if parsing fails
            }
          } 
          // If it's already an array, use it directly
          else if (Array.isArray(this.deploymentData.certification)) {
            newCert = this.deploymentData.certification;
          } else {
            newCert = []; // Fallback in case of unexpected data type
          }
        
          // Process the certifications
          this.certifications = newCert.map(c => ({
            certification: c.certification,
            year: new Date(c.year)
          }));
        
          console.log('Certifications:', this.certifications);
        }
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load deployment details.' });
        this.loading = false;
      }
    });
  }
  goBack(){
    window.history.back();
  }

  formatDate(date: string): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  }
}