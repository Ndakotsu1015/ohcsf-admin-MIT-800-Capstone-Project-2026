import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeploymentEndpoint } from 'src/app/api/endpoints/deployment.endpoint';
import { Cadre } from 'src/app/api/enums/cadre';
import { Gender } from 'src/app/api/enums/gender';
import { GradeLevel } from 'src/app/api/enums/grade-level';
import { MaritalStatus } from 'src/app/api/enums/marital-status';
import { Title } from 'src/app/api/enums/title';
import { BranchResource } from 'src/app/api/resources/branch.model';
import { DepartmentResource } from 'src/app/api/resources/department.model';
import { DivisionResource } from 'src/app/api/resources/division.model';
import { GeoPoliticalZoneResource } from 'src/app/api/resources/geopolitcalzone.model';
import { LgaResource } from 'src/app/api/resources/lga.model';
import { MinistryResource } from 'src/app/api/resources/ministry.model';
import { StateResource } from 'src/app/api/resources/state.model';
import { UnitResource } from 'src/app/api/resources/unit.model';
import { UploadService } from 'src/app/service/upload.service';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';
import { RequestType } from 'src/app/api/enums/request-type';
import { StateEndpoint } from 'src/app/api/endpoints/state.endpoint';
import { finalize } from 'rxjs/operators';
import { DepartmentEndpoint } from 'src/app/api/endpoints/department.endpoint';
import { DivisionEndpoint } from 'src/app/api/endpoints/division.endpoint';
import { AppLoadingService } from 'src/app/store/services/app-loading.service';

interface DropdownOption {
  name: string;
  value: string;
}

interface GradeLevelOption {
  name: string;
  value: string;
  category: string;
}

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
  selector: 'app-deployment-request-form',
  templateUrl: './deployment-request-form.component.html',
  styleUrl: './deployment-request-form.component.scss'
})

export class DeploymentRequestFormComponent  implements OnInit {
  environment = environment;
  enrollmentForm: FormGroup;
  photoUrl: string | null = '../../assets/images/avatar.png';
  qualifications: Qualification[] = [];
  qualificationDialog: boolean = false;
  certifications: Certification[] = [];
  certificationDialog: boolean = false;
  newQualification: Qualification = { qualification: '', institution: '', year: new Date() };
  newCertification: Certification = { certification: '', year: new Date() };
  departmentOptions: DepartmentResource[] = [];
  divisionOptions: DivisionResource[] = [];
  showPreview: boolean = false;
  userId: number;
  loading: boolean = true;

  titleOptions: DropdownOption[] = [
    { name: Title.MR, value: Title.MR },
    { name: Title.MRS, value: Title.MRS },
    { name: Title.MISS, value: Title.MISS },
  ];

  cadresOptions: DropdownOption[] = [
    { name: Cadre.DIRECTORATE, value: Cadre.DIRECTORATE },
    { name: Cadre.SENIOR, value: Cadre.SENIOR },
    { name: Cadre.MID_LEVEL, value: Cadre.MID_LEVEL },
    { name: Cadre.JUNIOR, value: Cadre.JUNIOR },
  ]

  zoneOptions: GeoPoliticalZoneResource[] = []

  addressOptions: DropdownOption[] = [
    { name: 'Same as Residential Address', value: 'same' },
    { name: 'Different Address', value: 'different' }
  ];

  gradeLevelOptions: GradeLevelOption[] = [];

  qualificationOptions: DropdownOption[] = [
    { name: 'BSc', value: 'BSc' },
    { name: 'MSc', value: 'MSc' },
    { name: 'PhD', value: 'PhD' },
    { name: 'HND', value: 'HND' },
    { name: 'OND', value: 'OND' },
    { name: 'SSCE', value: 'SSCE' }
  ];
  avatarUrl: string;
  states: any[] = [];
  stateOptions?: StateResource[];
  lga: LgaResource[];
  LGAs: StateResource[];
  unitOptions: UnitResource[] = [];

  genderOptions: DropdownOption[] = [
    { name: Gender.MALE, value: Gender.MALE },
    { name: Gender.FEMALE, value: Gender.FEMALE }
  ];
  maritalStatusOptions: DropdownOption[] = [
    { name: MaritalStatus.SINGLE, value: MaritalStatus.SINGLE },
    { name: MaritalStatus.MARRIED, value: MaritalStatus.MARRIED },
    { name: MaritalStatus.DIVORCED, value: MaritalStatus.DIVORCED },
    { name: MaritalStatus.WIDOWED, value: MaritalStatus.WIDOWED }
  ]

  requestTypeOptions: DropdownOption[] = [
    { name: RequestType.GENERAL, value: RequestType.GENERAL },
    { name: RequestType.SPECIAL_REQUEST, value: RequestType.SPECIAL_REQUEST },
    { name: RequestType.COMPENSATION, value: RequestType.COMPENSATION }
  ];

  ministryOptions: MinistryResource[] = [];
  designationOptions: any;
  agencyOptions: any[] = [];
  branchOptions: BranchResource[] = [];
  formData: any;
  maxDate: Date;
  defaultDate: Date;
  geopolitcalzone: GeoPoliticalZoneResource;
  geozoneID: number;

  constructor(
    private fb: FormBuilder,
    private deploymentEndpoint: DeploymentEndpoint,
    private departmentEndpoint: DepartmentEndpoint,
    private divisionEndpoint: DivisionEndpoint,
    private readonly http: HttpClient,
    private uploadService: UploadService,
    protected route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private stateEndpoint: StateEndpoint,
    private readonly appLoadingService: AppLoadingService,

  ) {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.defaultDate = new Date(this.maxDate);
    
    this.enrollmentForm = this.fb.group({
      title: ['', Validators.required],
      first_name: ['', Validators.required],
      middle_name: [''],
      last_name: ['', Validators.required],
      gender: ['', Validators.required],
      marital_status: ['', Validators.required],
      residential_address: ['', Validators.required],
      permanent_address: ['', Validators.required],
      phone_number: ['', Validators.required],
      nationality: ['', Validators.required],
      geopolitical_zone_id: ['', Validators.required],
      state_id: ['', Validators.required],
      lga_id: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      unit_id: ['', Validators.required],
      designation_id: ['', Validators.required],
      email_address: ['', [Validators.required, Validators.email]],
      nin: ['', Validators.required],
      request_type: ['', Validators.required],
      ippis_no: ['', Validators.required],
      employee_no: ['', Validators.required],
      ministry_id: [''],
      agency_id: [''],
      branch_id: [''],
      department_id: [''],
      division_id: [''],
      cadre: ['', Validators.required],
      grade_level: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.appLoadingService.startLoading('Fetching...');
    // Get user ID from route parameters
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      if (this.userId) {
        this.loadUserData(this.userId);
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User ID not found in route'
        });
        this.loading = false;
      }
    });

    // Load all reference data
    this.loadReferenceData();
  }

  loadReferenceData(): void {
    // this.getStates();
    this.getGeoZone();
    this.getMinistry();
    this.getDesignations();
    this.getBranches();
    this.getunit();
  }

  loadUserData(userId: number): void {
    this.deploymentEndpoint.single(userId).subscribe(
      (response: any) => {
        const userData = response.data;
        
        // Set form values from user data
        this.stateEndpoint.list().subscribe((response: any) => {
          this.stateOptions = response.data;
          this.getLGA(userData.employee.lga.state_id);
          const singleState:any = this.stateOptions.find((state)=> state.id ===userData.employee.lga.state_id);
          const zoneId = singleState.geopolitical_zone_id;
          this.geopolitcalzone = this.zoneOptions?.find((zone) => zone.id ===zoneId);
          console.log('geopolitcalzone', singleState);
          console.log('geoID', zoneId)
          this.geozoneID =zoneId
          this.populateForm(userData);
        })
        this.departmentEndpoint.list().subscribe((response:any)=>{
          this.departmentOptions= response.data;
        })
        this.divisionEndpoint.list().subscribe((response:any)=>{
          this.divisionOptions= response.data;
        })
        console.log('User data:', userData);
        
        // Load related data based on user's selections
        if (userData.geopolitical_zone_id) {
          this.selectedZoneState(userData.geopolitical_zone_id);
        }
        
        if (userData.state_id) {
          this.getLGA(userData.state_id);
        }
        
        if (userData.ministry_id) {
          this.selectedMinistryAgency(userData.ministry_id);
        }
        
        if (userData.branch_id) {
          this.selectedBranchDepartment(userData.branch_id);
        }
        
        if (userData.department_id) {
          this.selectedDepartmentDivision(userData.department_id);
        }
        
        if (userData.cadre) {
          this.getGradeLevel(userData.cadre);
        }
        
        // Load qualifications and certifications
        if (userData.qualifications) {
          this.qualifications = userData.qualification.map(q => ({
            qualification: q.qualification,
            institution: q.institution,
            year: new Date(q.year)
          }));
        }
        
        if (userData.certifications) {
          this.certifications = userData.certification.map(c => ({
            certification: c.certification,
            year: new Date(c.year)
          }));
        }
        
        // Load photo if available
        if (userData.employee.passport_file) {
          this.photoUrl = userData.employee.passport_file;
          this.avatarUrl = environment.apiUrl + '/file/get/' + userData.employee.passport_file;
        }
        
        this.loading = false;
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load user data'
        });
        console.error('Error loading user data:', error);
        this.loading = false;
      }
    );
    this.appLoadingService.stopLoading();

  }
  getStates(state_id) {
    
  }
  populateForm(userData: any): void {
    // let geopolitcalzone;
   
    
    if (!userData.qualification ){
      this.qualifications =[];
      this.certifications = [];
    }
    // geopolitcalzone = this.stateOptions?.find((zone) => zone.id === userData.employee.lga.state_id);
    const geoZone = this.zoneOptions?.find((zone) => zone.id === userData.employee.lga.state_id);
    console.log('geopolitcalzone', geoZone);
    this.enrollmentForm.patchValue({
      title: userData.employee.title,
      first_name: userData.employee.first_name,
      middle_name: userData.employee.middle_name,
      last_name: userData.employee.last_name,
      gender: userData.employee.gender,
      marital_status: userData.employee.marital_status,
      residential_address: userData.employee.residential_address,
      permanent_address: userData.employee.permanent_address,
      phone_number: userData.employee.phone_number,
      nationality: userData.employee.nationality,
      geopolitical_zone_id:  this.geozoneID,
      state_id: userData.employee.lga.state_id,
      lga_id: userData.employee.lga.id,
      date_of_birth: userData.employee.date_of_birth ? new Date(userData.employee.date_of_birth) : null,
      unit_id: userData.unit.id,
      designation_id: userData.designation.id,
      email_address: userData.employee.email_address,
      nin: userData.employee.nin,
      request_type: userData.request_type,
      ippis_no: userData.employee.ippis_no,
      employee_no: userData.employee.employee_no,
      ministry_id: userData.unit.division_id?.department.branch.ministry.id,
      agency_id: userData.agency_id,
      branch_id:  userData.unit.division_id?.department.branch.id,
      department_id: userData.unit.division_id?.department_id,
      division_id: userData.unit.division_id?.id,
      cadre: userData.cadre,
      passport_file: this.photoUrl,
      grade_level: userData.grade_level,
      formType: userData.id,
      qualification: this.qualifications || [],
      certification: this.certifications || [],
    });
    this.qualifications = userData.qualification;
    this.certifications = userData.certification;
    // this.avatarUrl = userData.employee.passport_file +;
  }

  resetForm() {
    // Don't completely reset the form, reload the user data
    this.loadUserData(this.userId);
    this.qualifications = [];
    this.certifications = [];
    this.avatarUrl = '../../../../assets/profile.png';
  }

  editForm() {
    this.showPreview = false;
  }

  getunit() {
    this.http.get(`${environment.apiUrl}/units`).subscribe((response: any) => {
      this.unitOptions = response.data;
    })
  }

  getGradeLevel(Category) {
    const gradeLevelOptions: GradeLevelOption[] = [
      { name: GradeLevel.LEVEL_01, value: GradeLevel.LEVEL_01, category: Cadre.JUNIOR },
      { name: GradeLevel.LEVEL_02, value: GradeLevel.LEVEL_02, category: Cadre.JUNIOR },
      { name: GradeLevel.LEVEL_03, value: GradeLevel.LEVEL_03, category: Cadre.JUNIOR },
      { name: GradeLevel.LEVEL_04, value: GradeLevel.LEVEL_04, category: Cadre.JUNIOR },
      { name: GradeLevel.LEVEL_05, value: GradeLevel.LEVEL_05, category: Cadre.JUNIOR },
      { name: GradeLevel.LEVEL_06, value: GradeLevel.LEVEL_06, category: Cadre.JUNIOR },
      { name: GradeLevel.LEVEL_07, value: GradeLevel.LEVEL_07, category: Cadre.MID_LEVEL },
      { name: GradeLevel.LEVEL_08, value: GradeLevel.LEVEL_08, category: Cadre.MID_LEVEL },
      { name: GradeLevel.LEVEL_09, value: GradeLevel.LEVEL_09, category: Cadre.MID_LEVEL },
      { name: GradeLevel.LEVEL_10, value: GradeLevel.LEVEL_10, category: Cadre.MID_LEVEL },
      { name: GradeLevel.LEVEL_11, value: GradeLevel.LEVEL_11, category: Cadre.SENIOR },
      { name: GradeLevel.LEVEL_12, value: GradeLevel.LEVEL_12, category: Cadre.SENIOR },
      { name: GradeLevel.LEVEL_13, value: GradeLevel.LEVEL_13, category: Cadre.SENIOR },
      { name: GradeLevel.LEVEL_14, value: GradeLevel.LEVEL_14, category: Cadre.DIRECTORATE },
      { name: GradeLevel.LEVEL_15, value: GradeLevel.LEVEL_15, category: Cadre.DIRECTORATE },
      { name: GradeLevel.LEVEL_16, value: GradeLevel.LEVEL_16, category: Cadre.DIRECTORATE },
      { name: GradeLevel.LEVEL_17, value: GradeLevel.LEVEL_17, category: Cadre.DIRECTORATE },
      { name: GradeLevel.SPECIAL_CAT, value: GradeLevel.SPECIAL_CAT, category: Cadre.PERMANENT_SECRETARY },
      { name: GradeLevel.SPECIAL_CAT, value: GradeLevel.SPECIAL_CAT, category: Cadre.HEAD_OF_SERVICE },
    ];
    
    this.gradeLevelOptions = gradeLevelOptions.filter((GL) => GL.category === Category);
  }

  getBranches() {
    this.http.get(`${environment.apiUrl}/branches`).subscribe((response: any) => {
      this.branchOptions = response.data;
    })
  }
  
  getGeoZone() {
    this.http.get(`${environment.apiUrl}/geopolitical-zones`).subscribe((response: any) => {
      this.zoneOptions = response.data;
    })
  }
  
  getMinistry() {
    this.http.get(`${environment.apiUrl}/ministries`).subscribe((response: any) => {
      this.ministryOptions = response.data;
    })
  }
  
  selectedMinistryAgency(minID) {
    this.http.get(`${environment.apiUrl}/agencies`).subscribe((response: any) => {
      const ministries = response.data;
      this.agencyOptions = ministries.filter((agency) => agency.ministry_id === minID)
    })
  }

  selectedBranchDepartment(branchID) {
    this.http.get(`${environment.apiUrl}/departments`).subscribe((response: any) => {
      const branches = response.data;
      this.departmentOptions = branches.filter((department) => department.branch_id === branchID)
    })
  }

  selectedDepartmentDivision(departmentID) {
    this.http.get(`${environment.apiUrl}/divisions`).subscribe((response: any) => {
      const divisions = response.data;
      this.divisionOptions = divisions.filter((division) => division.department_id === departmentID)
    })
  }

  selectedZoneState(geoID) {
    this.stateEndpoint.list().subscribe((response: any) => {
      const states = response.data;
      this.stateOptions = states.filter((state) => state.geopolitical_zone_id === geoID)
    })
  }

  getDesignations() {
    this.http.get(`${environment.apiUrl}/designations`).subscribe((response: any) => {
      this.designationOptions = response.data;
    })
  }
  
 

  getLGA(stateID) {
    this.http.get(`${environment.apiUrl}/lgas`).subscribe((response: any) => {
      const local_g = response.data;
      this.lga = local_g.filter((lga) => lga.state_id === stateID)
    })
  }

  getAgency() {
    this.http.get(`${environment.apiUrl}/agencies`).subscribe((response: any) => {
      this.agencyOptions = response.data;
    })
  }
  
  onPhotoUpload(event: any, fileUpload: any): void {
    if (event.files && event.files.length > 0) {
      const file = event.files[0];

      const formData = new FormData();
      formData.append('file', file);

      this.http.post(`${environment.apiUrl}/file/upload`, formData).subscribe(
        (response: any) => {
          this.photoUrl = response.data;
          this.avatarUrl = environment.apiUrl + '/file/get/' + response.data;
          console.log('File uploaded:', this.avatarUrl);
        },
        (error) => {
          console.error('File upload failed:', error);
        }
      );
    }
    fileUpload.clear();
  }

  showQualificationDialog(): void {
    this.qualificationDialog = true;
    this.newQualification = { qualification: '', institution: '', year: new Date() };
  }

  hideQualificationDialog(): void {
    this.qualificationDialog = false;
  }

  addQualification(): void {
    if (!this.qualifications) {
      this.qualifications = [];
    }
    this.newQualification.year.getFullYear();

    if (this.newQualification.qualification && this.newQualification.institution) {
      this.qualifications.push({ ...this.newQualification });
      this.hideQualificationDialog();
    }
  }

  removeQualification(Qualification: Qualification): void {
    this.qualifications = this.qualifications.filter(q => q !== Qualification);
  }

  showCertificationDialog(): void {
    this.certificationDialog = true;
    this.newCertification = { certification: '', year: new Date() };
  }

  hideCertificationDialog(): void {
    this.certificationDialog = false;
  }

  addCertification(): void {
    if (!this.certifications) {
      this.certifications = [];
    }
    this.newCertification.year.getFullYear();

    if (this.newCertification.certification) {
      this.certifications.push({ ...this.newCertification });
      this.hideCertificationDialog();
    }
  }

  removeCertification(Certification: Certification): void {
    this.certifications = this.certifications.filter(q => q !== Certification);
  }

  formatDate(date: Date): string {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    return date.toISOString().split('T')[0];
  }
  
  onSubmit(): void {
    if (this.enrollmentForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Form Incomplete',
        detail: 'Please fill in all required fields before submitting.'
      });

      Object.keys(this.enrollmentForm.controls).forEach(key => {
        this.enrollmentForm.get(key)?.markAsTouched();
      });

      return;
    }
    
    const ministry = this.ministryOptions.find((ministry) => ministry.id === this.enrollmentForm.value.ministry_id);
    const agency = this.agencyOptions.find((agency) => agency.id === this.enrollmentForm.value.agency_id);
    const branch = this.branchOptions.find((branch) => branch.id === this.enrollmentForm.value.branch_id);
    const department = this.departmentOptions.find((department) => department.id === this.enrollmentForm.value.department_id);
    const division = this.divisionOptions.find((division) => division.id === this.enrollmentForm.value.division_id);

    this.formData = {
      id: this.userId,
      title: this.enrollmentForm.value.title,
      first_name: this.enrollmentForm.value.first_name,
      middle_name: this.enrollmentForm.value.middle_name,
      last_name: this.enrollmentForm.value.last_name,
      gender: this.enrollmentForm.value.gender,
      marital_status: this.enrollmentForm.value.marital_status,
      residential_address: this.enrollmentForm.value.residential_address,
      permanent_address: this.enrollmentForm.value.permanent_address,
      phone_number: this.enrollmentForm.value.phone_number,
      nationality: this.enrollmentForm.value.nationality,
      geopolitical_zone_id: this.enrollmentForm.value.geopolitical_zone_id,
      state_id: this.enrollmentForm.value.state_id,
      lga_id: this.enrollmentForm.value.lga_id,
      unit_id: this.enrollmentForm.value.unit_id,
      designation_id: this.enrollmentForm.value.designation_id,
      email_address: this.enrollmentForm.value.email_address,
      nin: this.enrollmentForm.value.nin,
      ippis_no: this.enrollmentForm.value.ippis_no,
      employee_no: this.enrollmentForm.value.employee_no,
      cadre: this.enrollmentForm.value.cadre,
      grade_level: this.enrollmentForm.value.grade_level,
      request_type: this.enrollmentForm.value.request_type,
      ministry: ministry?.name,
      agency: agency?.name,
      branch: branch?.name,
      department: department?.name,
      division: division?.name,
      qualification: this.qualifications,
      certification: this.certifications,
      passport_file: this.photoUrl,
      date_of_birth: this.enrollmentForm.value.date_of_birth
        ? this.formatDate(this.enrollmentForm.value.date_of_birth) : null,
    };

    if (this.enrollmentForm.valid) {
      this.showPreview = true;
    } else {
      Object.keys(this.enrollmentForm.controls).forEach(field => {
        const control = this.enrollmentForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }

  updateUser(): void {
    this.loading = true;
    
    // Create payload for update
    const updatePayload = {
      ...this.formData,
      // Add any additional fields needed for the update
    };
    
    this.http.put(`${environment.apiUrl}/users/${this.userId}`, updatePayload)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(
        (response: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'User information updated successfully'
          });
          
          // Navigate back to user list or details page
          this.router.navigate(['/users']);
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update user information'
          });
          console.error('Update failed:', error);
        }
      );
  }

  cancelEdit(): void {
    // Navigate back without saving
    this.router.navigate(['/users']);
  }
}
