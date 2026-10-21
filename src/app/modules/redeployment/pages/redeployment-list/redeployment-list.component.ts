import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DeploymentEndpoint } from 'src/app/api/endpoints/deployment.endpoint';
import { DepartmentResource } from 'src/app/api/resources/department.model';
import { DeploymentResource } from 'src/app/api/resources/deployment.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BranchResource } from 'src/app/api/resources/branch.model';
import { MinistryResource } from 'src/app/api/resources/ministry.model';
import { DivisionResource } from 'src/app/api/resources/division.model';
import { UnitResource } from 'src/app/api/resources/unit.model';
import { GradeLevel } from 'src/app/api/enums/grade-level';
import { Cadre } from 'src/app/api/enums/cadre';
import { Gender } from 'src/app/api/enums/gender';
import { AgencyEndpoint } from 'src/app/api/endpoints/agency.endpoint';
import { DivisionEndpoint } from 'src/app/api/endpoints/division.endpoint';
import { DesignationEndpoint } from 'src/app/api/endpoints/desgnation.endpoint';
import { DepartmentEndpoint } from 'src/app/api/endpoints/department.endpoint';
import { BranchEndpoint } from 'src/app/api/endpoints/branch.endpoint';
import { MinistryEndpoint } from 'src/app/api/endpoints/ministry.endpoint';
import { AppLoadingService } from 'src/app/store/services/app-loading.service';
import { ReDeploymentRequestEndpoint } from 'src/app/api/endpoints/redeployment.endpoint';


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
    selector: 'app-redeployment-list',
    templateUrl: './redeployment-list.component.html',
    styleUrl: './redeployment-list.component.scss'
})
export class RedeploymentListComponent {
    Deployments: DeploymentResource[] | any[] = [];
    filteredDeployments: DeploymentResource[] = [];
    loading: boolean = true;
    globalFilterValue: string = '';
    filterForm: FormGroup;
    selectedMinistryId: number = 0;
    agencyOptions: any[];
    branchOptions: BranchResource[];
    ministryOptions: MinistryResource[] = [];
    departmentOptions: DepartmentResource[] = [];
    divisionOptions: DivisionResource[] = [];
    unitOptions: UnitResource[] = [];
    gradeLevelOptions: GradeLevelOption[] = [];
    formData: any;
    selectedDeployments: DeploymentResource[] | any[] = [];


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
    constructor(
        private deploymentEndpoint: DeploymentEndpoint,
        private redeploymentEndpoint: ReDeploymentRequestEndpoint,
        private messageService: MessageService,
        private router: Router,
        private fb: FormBuilder,
        private http: HttpClient,
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
    }

    ngOnInit() {
        this.loadEmployees();
    }

    approveSelected() {
        this.appLoadingService.startLoading('Approving deployments...');
        const deploymentData = this.selectedDeployments.map(deployment => ({
            unit_id: deployment.unit.id,
            employee_id: deployment.employee.id,
            deployment_id: deployment.id
        }));
        if(deploymentData.length === 0) {
            this.appLoadingService.stopLoading();
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No deployments selected.',
            });
            return;
        }
        console.log('Approving deployments:', deploymentData);
        this.deploymentEndpoint.approveDeployment(deploymentData).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Deployments approved successfully.',
                });
            this.appLoadingService.stopLoading();

                this.loadEmployees();
            },
            error: (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to approve deployments.',
                });
            this.appLoadingService.stopLoading();

            },
        });
    }
    loadEmployees() {
        this.loading = true;
        this.redeploymentEndpoint.listProposed().subscribe({
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

    selectedDepartmentDivision(departmentID) {
        this.divisionEndpoint.list().subscribe((response: any) => {
                const divisions = response.data;
                this.divisionOptions = divisions.filter(
                    (division) => division.department_id === departmentID
                );
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
    selectedBranchDepartment(branchID) {
        console.log(branchID);
        this.departmentEnpoint.list().subscribe((response: any) => {
                const branches = response.data;
                this.departmentOptions = branches.filter(
                    (department) => department.branch_id === branchID
                );
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

    viewEmployeeDetails(id) {
        console.log('Viewing employee details with id:', id);
        this.router.navigate(['/admin/dashboard/deployment/detail', id]);
    }

    resetFilter() {
        this.loadEmployees();
        this.filterForm.reset();
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
                    // If data.data is already an array
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
                let allDeployments = [];

                // If response.data is an object with numeric keys
                if (data.data && typeof data.data === 'object') {
                    Object.keys(data.data).forEach((key) => {
                        if (Array.isArray(data.data[key])) {
                            allDeployments = [
                                ...allDeployments,
                                ...data.data[key],
                            ];
                        }
                    });
                    this.Deployments = allDeployments;
                } else {
                    // If response.data is already an array
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
