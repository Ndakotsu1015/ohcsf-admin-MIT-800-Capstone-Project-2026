import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LogarithmicScale } from 'chart.js';
import { MessageService } from 'primeng/api';
import { AgencyEndpoint } from 'src/app/api/endpoints/agency.endpoint';
import { DeploymentEndpoint } from 'src/app/api/endpoints/deployment.endpoint';
import { DivisionEndpoint } from 'src/app/api/endpoints/division.endpoint';
import { Cadre } from 'src/app/api/enums/cadre';
import { Gender } from 'src/app/api/enums/gender';
import { GradeLevel } from 'src/app/api/enums/grade-level';
import { BranchResource } from 'src/app/api/resources/branch.model';
import { DepartmentResource } from 'src/app/api/resources/department.model';
import { DeploymentResource } from 'src/app/api/resources/deployment.model';
import { DivisionResource } from 'src/app/api/resources/division.model';
import { GeoPoliticalZoneResource } from 'src/app/api/resources/geopolitcalzone.model';
import { MinistryResource } from 'src/app/api/resources/ministry.model';
import { UnitResource } from 'src/app/api/resources/unit.model';
import { environment } from 'src/environments/environment';
import { RequestType } from 'src/app/api/enums/request-type';
import { DesignationEndpoint } from 'src/app/api/endpoints/desgnation.endpoint';
import { AppLoadingService } from 'src/app/store/services/app-loading.service';
import { DepartmentEndpoint } from 'src/app/api/endpoints/department.endpoint';
import { BranchEndpoint } from 'src/app/api/endpoints/branch.endpoint';
import { MinistryEndpoint } from 'src/app/api/endpoints/ministry.endpoint';

interface DropdownOption {
    name: string;
    value: string;
}
interface GradeLevelOption {
    name: string;
    value: string;
    category: string;
}
@Component({
  selector: 'app-approved-deployments',
  templateUrl: './approved-deployments.component.html',
  styleUrl: './approved-deployments.component.scss',
  providers: [MessageService],

})
export class ApprovedDeploymentsComponent {
    filterForm: FormGroup;
    requestForm: FormGroup;
    Deployments: DeploymentResource[] = [];
    filteredDeployments: DeploymentResource[] = [];
    loading: boolean = true;
    globalFilterValue: string = '';
    ministryOptions: MinistryResource[] = [];
    selectedMinistryId: number = 0;
    designationOptions: any;
    agencyOptions: any[];
    branchOptions: BranchResource[];
    unitOptions: UnitResource[] = [];
    gradeLevelOptions: GradeLevelOption[] = [];
    zoneOptions: GeoPoliticalZoneResource[] = [];
    departmentOptions: DepartmentResource[] = [];
    divisionOptions: DivisionResource[] = [];
    formData: any;
    requestDialog: boolean = false;
    requestedDeploymentData: any;
    requestLoader: boolean = false
    originalResponseData: any;
    uploading: boolean = false;

    requestTypeOptions: DropdownOption[] = [
        { name: RequestType.COMPENSATION, value: RequestType.COMPENSATION },
        { name: RequestType.SPECIAL_REQUEST, value: RequestType.SPECIAL_REQUEST }
    ];

    uploadedRequestLetter: string;
    requestLetterUrl: any;
    constructor(
        private fb: FormBuilder,
        private deploymentEndpoint: DeploymentEndpoint,
        private messageService: MessageService,
        private router: Router,
        private readonly http: HttpClient,
        private agencyEndpoint: AgencyEndpoint,
        private divisionEndpoint: DivisionEndpoint,
        private designationEdpoint: DesignationEndpoint,
        private departmentEnpoint: DepartmentEndpoint,
        private branchEndpoint: BranchEndpoint,
        private divisionEnpoint: DivisionEndpoint,
        private ministryEnpoint: MinistryEndpoint,
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

        this.requestForm = this.fb.group({
            ministry_id: [''],
            agency_id: [''],
            branch_id: [''],
            department_id: [''],
            division_id: [''],
            unit_id: [''],
            reason: [''],
            request_type: [''],
            designation_id: [''],
        });
    }

    ngOnInit() {
        this.loadEmployees();
        this.getMinistry();
        this.getDesignations();
        this.getBranches();
        this.getunit();
        this.getDepartments();
        this.getAgency();
        this.getDivision();
    }

    getDeployment(id) {
        this.appLoadingService.startLoading('Loading...');

        this.requestLoader = true;
        this.deploymentEndpoint.single(id).subscribe((response: any) => {
            const userData = response.data;
            this.requestedDeploymentData = userData;
            this.populateForm(userData)
        })

    }
    getIconClass(): string {
        return this.uploadedRequestLetter ? 'pi pi-check' : 'pi pi-upload';
    }
    onPhotoUpload(event: any, fileUpload: any): void {
        this.uploading = true;
        if (event.files && event.files.length > 0) {
            const file = event.files[0];

            const formData = new FormData();
            formData.append('file', file);

            this.http.post(`${environment.apiUrl}/file/upload`, formData).subscribe(
                (response: any) => {
                    this.requestLetterUrl = response.data;
                    this.uploadedRequestLetter = environment.apiUrl + '/file/get/' + response.data;
                    this.uploading = false;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'File uploaded successfully',
                    });
                    console.log('File uploaded:', this.uploadedRequestLetter);
                },
                (error) => {
                    console.error('File upload failed:', error);
                    this.uploading = false;
                }
            );
        }
        fileUpload.clear();
    }

    submitRequest() {
        this.appLoadingService.startLoading('Submitting...');
        const formData = {

            unit_id: this.requestForm.value.unit_id,
            reason: this.requestForm.value.reason,
            request_type: this.requestForm.value.request_type,
            designation_id: this.requestForm.value.designation_id,
            employee_id: this.requestedDeploymentData.employee.id,
            request_letter_file: this.requestLetterUrl,
            status: "Pending",
        };
        console.log(formData)

        this.http.post(`${environment.apiUrl}/redeployment-requests`, formData).subscribe((response: any) => {
            this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Request submitted successfully',
            });
            this.requestForm.reset();
            this.appLoadingService.stopLoading();
            console.log(response);
            this.requestDialog = false;
            this.loadEmployees();
        }, (error) => {
            console.error('Request submission failed:', error);
            this.appLoadingService.stopLoading();

            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: error.error.message,
            })

        })
    }
    getDepartments() {
        this.http
            .get(`${environment.apiUrl}/departments`)
            .subscribe((response: any) => {
                const branches = response.data;
                this.departmentOptions = branches
            });
    }

    getDivision() {
        this.divisionEndpoint.list().subscribe((response: any) => {
            this.divisionOptions = response.data;
        })
    }


    getAgency() {

        this.agencyEndpoint.list().subscribe((response: any) => {
            this.agencyOptions = response.data;
        })
    }

    populateForm(userData: any) {

        this.requestForm.patchValue({
            ministry_id: userData.unit.division_id?.department.branch?.agency?.ministry.id,
            agency_id: userData.unit.division_id?.department.branch?.agency?.id,
            branch_id: userData.unit.division_id?.department.branch.id,
            department_id: userData.unit.division_id?.department_id,
            division_id: userData.unit.division_id?.id,
            unit_id: userData.unit.id,
            request_type: userData.request_type,
            designation_id: userData.designation.id
        })
        this.requestDialog = true;
        this.requestLoader = false
        this.appLoadingService.stopLoading();

    }

    genderOptions: DropdownOption[] = [
        { name: Gender.MALE, value: Gender.MALE },
        { name: Gender.FEMALE, value: Gender.FEMALE },
    ];

    cadresOptions: DropdownOption[] = [
        { name: Cadre.DIRECTORATE, value: Cadre.DIRECTORATE },
        { name: Cadre.SENIOR, value: Cadre.SENIOR },
        { name: Cadre.MID_LEVEL, value: Cadre.MID_LEVEL },
        { name: Cadre.JUNIOR, value: Cadre.JUNIOR },
    ];

    getunit() {
        this.http
            .get(`${environment.apiUrl}/units`)
            .subscribe((response: any) => {
                this.unitOptions = response.data;
            });
    }

    getGradeLevel(Category) {
        const gradeLevelOptions: GradeLevelOption[] = [
            {
                name: GradeLevel.LEVEL_01,
                value: GradeLevel.LEVEL_01,
                category: Cadre.JUNIOR,
            },
            {
                name: GradeLevel.LEVEL_02,
                value: GradeLevel.LEVEL_02,
                category: Cadre.JUNIOR,
            },
            {
                name: GradeLevel.LEVEL_03,
                value: GradeLevel.LEVEL_03,
                category: Cadre.JUNIOR,
            },
            {
                name: GradeLevel.LEVEL_04,
                value: GradeLevel.LEVEL_04,
                category: Cadre.JUNIOR,
            },
            {
                name: GradeLevel.LEVEL_05,
                value: GradeLevel.LEVEL_05,
                category: Cadre.JUNIOR,
            },
            {
                name: GradeLevel.LEVEL_06,
                value: GradeLevel.LEVEL_06,
                category: Cadre.JUNIOR,
            },
            {
                name: GradeLevel.LEVEL_07,
                value: GradeLevel.LEVEL_07,
                category: Cadre.MID_LEVEL,
            },
            {
                name: GradeLevel.LEVEL_08,
                value: GradeLevel.LEVEL_08,
                category: Cadre.MID_LEVEL,
            },
            {
                name: GradeLevel.LEVEL_09,
                value: GradeLevel.LEVEL_09,
                category: Cadre.MID_LEVEL,
            },
            {
                name: GradeLevel.LEVEL_10,
                value: GradeLevel.LEVEL_10,
                category: Cadre.MID_LEVEL,
            },
            {
                name: GradeLevel.LEVEL_11,
                value: GradeLevel.LEVEL_11,
                category: Cadre.SENIOR,
            },
            {
                name: GradeLevel.LEVEL_12,
                value: GradeLevel.LEVEL_12,
                category: Cadre.SENIOR,
            },
            {
                name: GradeLevel.LEVEL_13,
                value: GradeLevel.LEVEL_13,
                category: Cadre.SENIOR,
            },
            {
                name: GradeLevel.LEVEL_14,
                value: GradeLevel.LEVEL_14,
                category: Cadre.DIRECTORATE,
            },
            {
                name: GradeLevel.LEVEL_15,
                value: GradeLevel.LEVEL_15,
                category: Cadre.DIRECTORATE,
            },
            {
                name: GradeLevel.LEVEL_16,
                value: GradeLevel.LEVEL_16,
                category: Cadre.DIRECTORATE,
            },
            {
                name: GradeLevel.LEVEL_17,
                value: GradeLevel.LEVEL_17,
                category: Cadre.DIRECTORATE,
            },
            {
                name: GradeLevel.SPECIAL_CAT,
                value: GradeLevel.SPECIAL_CAT,
                category: Cadre.PERMANENT_SECRETARY,
            },
            {
                name: GradeLevel.SPECIAL_CAT,
                value: GradeLevel.SPECIAL_CAT,
                category: Cadre.HEAD_OF_SERVICE,
            },
        ];
        console.log(Category);
        this.gradeLevelOptions = gradeLevelOptions.filter(
            (GL) => GL.category === Category
        );
    }

    getDesignations() {
        this.designationEdpoint.list().subscribe((response: any) => {
            this.designationOptions = response.data;
        });
    }
    getBranches() {
        this.branchEndpoint.list().subscribe((response: any) => {
                this.branchOptions = response.data;
            });
    }

    selectedMinistryAgency(minID) {
        this.selectedMinistryId = minID;
        this.agencyEndpoint.list().subscribe((response: any) => {
                const ministries = response.data;
                this.agencyOptions = ministries.filter(
                    (agency) => agency.ministry_id === minID
                );
            });
    }

    resetFilter() {
        this.loadEmployees();
        this.filterForm.reset();
    }

    selectedBranchDepartment(branchID) {
        console.log(branchID);
        this.departmentEnpoint.list().subscribe((response: any) => {
                const branches = response.data;
                this.departmentOptions = branches.filter(
                    (department) => department.branch_id === branchID
                );
            });
    }

    selectedDepartmentDivision(departmentID) {
        this.divisionEndpoint.list().subscribe((response: any) => {
                const divisions = response.data;
                this.divisionOptions = divisions.filter(
                    (division) => division.department_id === departmentID
                );
            });
    }

    getMinistry() {
        this.ministryEnpoint.list().subscribe((response: any) => {
                this.ministryOptions = response.data;
            });
    }

    loadEmployees() {
        this.loading = true;
        this.deploymentEndpoint.list().subscribe({
            next: (response) => {
                // Extract deployments from the nested data structure
                this.originalResponseData = response;
                let allDeployments = [];

                // If response.data is an object with numeric keys
                if (response.data && typeof response.data === 'object') {
                    const latestDeploymentsByEmployee = {};

                    // Process all deployments
                    Object.keys(response.data).forEach(key => {
                        if (Array.isArray(response.data[key])) {
                            response.data[key].forEach(deployment => {
                                const employeeId = deployment.employee_id;

                                // If this is the first deployment for this employee or it's newer than what we have
                                if (!latestDeploymentsByEmployee[employeeId] ||
                                    new Date(deployment.updated_at) > new Date(latestDeploymentsByEmployee[employeeId].updated_at)) {
                                    latestDeploymentsByEmployee[employeeId] = {
                                        ...deployment,
                                        length: response.data[key].length // Keep the length information
                                    };
                                }
                            });
                        }
                    });

                    // Convert the object back to an array
                    this.Deployments = Object.values(latestDeploymentsByEmployee);
                } else {
                    this.Deployments = response.data;
                }

                this.filteredDeployments = this.Deployments.filter((deployment) => 
                    deployment.status == 'Approved');
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

    getEmployeeDeployments(employeeId: number) {
        const deployments = [];

        // Loop through all the keys in the original response data
        Object.keys(this.originalResponseData.data).forEach(key => {
            if (Array.isArray(this.originalResponseData.data[key])) {
                // Filter deployments for this employee
                const employeeDeployments = this.originalResponseData.data[key].filter(
                    dep => dep.employee_id === employeeId
                );

                // Add them to our collection
                deployments.push(...employeeDeployments);
            }
        });

        // Sort by date if needed
        return deployments.sort((a, b) =>
            new Date(b.assumption_date).getTime() - new Date(a.assumption_date).getTime()
        );
    }

    viewEmployeeDetails(id) {
        // Handle employee details view
        console.log('Viewing employee details with id:', id);
        this.router.navigate(['/admin/dashboard/deployment/detail', id]);
    }

    applyGlobalFilter() {
        this.loading = true;
        this.deploymentEndpoint.search(this.globalFilterValue).subscribe({
            next: (data) => {

                let allDeployments = [];

                // If response.data is an object with numeric keys
                if (data.data && typeof data.data === 'object') {
                    Object.keys(data.data).forEach(key => {
                        if (Array.isArray(data.data[key])) {
                            const deploymentsWithLength = data.data[key].map(item => ({
                                ...item,
                                length: data.data[key].length // Assign the length of the array
                            }));
                            allDeployments = [...allDeployments, ...deploymentsWithLength];
                        }
                    });
                    this.Deployments = allDeployments;
                } else {
                    this.Deployments = data.data;
                }
                this.filteredDeployments = this.Deployments;
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

    onSubmit(): void {
        if (
            this.filterForm.value.cadre == '' &&
            this.filterForm.value.grade_level == '' &&
            this.filterForm.value.mda_id == '' &&
            this.filterForm.value.agency_id == '' &&
            this.filterForm.value.branch_id == '' &&
            this.filterForm.value.department_id == '' &&
            this.filterForm.value.division_id == '' &&
            this.filterForm.value.unit_id == '' &&
            this.filterForm.value.gender == '' &&
            this.filterForm.value.search == ''
        ) {
            return;
        }
        this.formData = {
            cadre: this.filterForm.value.cadre,
            grade_level: this.filterForm.value.grade_level,
            mda_id: this.filterForm.value.ministry_id,
            agency_id: this.filterForm.value.agency_id,
            branch_id: this.filterForm.value.branch_id,
            department_id: this.filterForm.value.department_id,
            division_id: this.filterForm.value.division_id,
            unit_id: this.filterForm.value.unit_id,
            gender: this.filterForm.value.gender,
            search: this.globalFilterValue,
        };
        //submit the filter form and update the deployment list
        this.loading = true;
        this.deploymentEndpoint.filterDeployments(this.filterForm).subscribe({
            next: (data) => {
                // Extract deployments from the nested data structure
                // this.originalResponseData = response;
                let allDeployments = [];

                // If response.data is an object with numeric keys
                if (data.data && typeof data.data === 'object') {
                    const latestDeploymentsByEmployee = {};

                    // Process all deployments
                    Object.keys(data.data).forEach(key => {
                        if (Array.isArray(data.data[key])) {
                            data.data[key].forEach(deployment => {
                                const employeeId = deployment.employee_id;

                                // If this is the first deployment for this employee or it's newer than what we have
                                if (!latestDeploymentsByEmployee[employeeId] ||
                                    new Date(deployment.updated_at) > new Date(latestDeploymentsByEmployee[employeeId].updated_at)) {
                                    latestDeploymentsByEmployee[employeeId] = {
                                        ...deployment,
                                        length: data.data[key].length // Keep the length information
                                    };
                                }
                            });
                        }
                    });

                    // Convert the object back to an array
                    this.Deployments = Object.values(latestDeploymentsByEmployee);
                } else {
                    this.Deployments = data.data;
                }
                this.filteredDeployments = this.Deployments;
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
