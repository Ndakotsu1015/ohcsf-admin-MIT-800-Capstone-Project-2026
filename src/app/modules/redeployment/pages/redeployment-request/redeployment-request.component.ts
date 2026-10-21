import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DeploymentEndpoint } from 'src/app/api/endpoints/deployment.endpoint';
import { DepartmentResource } from 'src/app/api/resources/department.model';
import { DeploymentResource } from 'src/app/api/resources/deployment.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ReDeploymentRequestEndpoint } from 'src/app/api/endpoints/redeployment.endpoint';
import { AppLoadingService } from 'src/app/store/services/app-loading.service';


@Component({
  selector: 'app-redeployment-request',
  templateUrl: './redeployment-request.component.html',
  styleUrl: './redeployment-request.component.scss'
})
export class RedeploymentRequestComponent {
  Deployments: DeploymentResource[] | any = [];
  filteredDeployments: DeploymentResource[] = [];
  loading: boolean = true;
  requestDialog: boolean = false;
  globalFilterValue: string = '';
  filterForm: FormGroup;
  employeeRequest: any;
  showRejectionDialog: boolean = false;
  rejectionReason: string = '';
  passport_file: string;
  selectedDeployments: DeploymentResource[] | any = [];

  constructor(
    private deploymentEndpoint: DeploymentEndpoint,
    private messageService: MessageService,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private reDeploymentEndpoint: ReDeploymentRequestEndpoint,
    private readonly appLoadingService: AppLoadingService,


  ) {
    this.filterForm = this.fb.group({
      ministry_id: [''],
      agency_id: [''],
      branch_id: [''],
      department_id: [''],
      division_id: [''],
      unit_id: [''],
      cadre: [''],
      grade_level: [''],
      gender: [''],
      search: [''],
    });
  }

  ngOnInit() {
    this.loadEmployees();
  }
  loadEmployees() {
    this.loading = true;
    this.http.get(`${environment.apiUrl}/redeployment-requests`).subscribe({
      next: (response: any) => {
        let allDeployments = [];

        let depos = response.data

        this.filteredDeployments = depos;
        this.loading = false;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load employee data.',
        });
        this.loading = false;
      },
    });
  }

  approveSelected() {
    const deploymentData = this.selectedDeployments.map(deployment => (deployment.id));
    console.log('Approving deployments:', deploymentData);
    this.deploymentEndpoint.approveDeploymentRequest(deploymentData).subscribe({
        next: () => {
            this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Deployments approved successfully.',
            });
            this.loadEmployees();
        },
        error: (error) => {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to approve deployments.',
            });
        },
    });
}


  viewEmployeeDetails(id) {
    this.appLoadingService.startLoading('Loading request details...');
    this.reDeploymentEndpoint.single(id).subscribe({
      next: (response: any) => {
        this.employeeRequest = response.data;
        this.appLoadingService.stopLoading();
        this.passport_file = environment.apiUrl + '/file/get/' + this.employeeRequest.employee.passport_file;
        this.requestDialog = true;

      },
      error: (error) => {
        this.appLoadingService.stopLoading();
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load employee details.',
        });
      },
    });
    // this.employeeRequest = this.filteredDeployments.find((employee) => employee.id === id);
    console.log('Viewing employee details with id:', id);

    //   this.router.navigate(['/admin/dashboard/deployment/detail', id]);
  }

  approveRequest(toggle): void {
    // this.approve.emit(this.employeeRequest.id);
    this.reDeploymentEndpoint.update(this.employeeRequest.id, toggle).subscribe({
      next: (response: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Request ' + toggle + ' successfully.',
        });
        this.loadEmployees();
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to approve request.',
        });
      },
    });
    this.requestDialog = false;
  }

  openRejectionDialog(): void {
    this.showRejectionDialog = true;
  }

  resetFilter() {
    this.loadEmployees();
    this.filterForm.reset();
  }
  confirmReject(): void {
    // this.reject.emit(this.employeeRequest.id);
    this.showRejectionDialog = false;
    this.requestDialog = false;
  }

  cancelReject(): void {
    this.rejectionReason = '';
    this.showRejectionDialog = false;
  }

  downloadFile(): void {
    const fileUrl = environment.apiUrl + '/file/get/' + this.employeeRequest.request_letter_file;
    console.log('Downloading file:', this.employeeRequest.request_letter_file);
    window.open(fileUrl, '_blank');
  }

  getStatusSeverity(status: string): string {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'success';
      case 'rejected':
        return 'danger';
      case 'pending':
        return 'warning';
      case 'in progress':
        return 'info';
      default:
        return 'secondary';
    }
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  // Check if the request can be approved/rejected (only if it's pending)
  canApproveOrReject(): boolean {
    return this.employeeRequest &&
      this.employeeRequest.status.toLowerCase() === 'pending'      //    this.currentUser !== '';
  }
  applyGlobalFilter() {
    this.loading = true;
    this.http.get(`${environment.apiUrl}/redeployment-requests`).subscribe({
      next: (response: any) => {
        let allDeployments = [];

        let depos = response.data

        this.filteredDeployments = depos;
        this.loading = false;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load employee data.',
        });
        this.loading = false;
      },
    });
  }
}
