import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
import { CadreEndpoint } from 'src/app/api/endpoints/cadre.endpoint';
import { GradeLevelEndpoint } from 'src/app/api/endpoints/grade-level.endpoint';
interface DropdownOption {
  name: string;
  value: string;
}
interface GradeLevelOption {
  id:number;
  name: string;
  value: string;
  cadre_id: number;
  description:string;
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
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.scss'],
  providers: [MessageService]
})
export class EnrollmentComponent implements OnInit {
  environment = environment;
  enrollmentForm: FormGroup;
  employmentForm: FormGroup;
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

  titleOptions: DropdownOption[] = [
    { name: Title.MR, value: Title.MR },
    { name: Title.MRS, value: Title.MRS },
    { name: Title.MISS, value: Title.MISS },
  ];

  cadresOptions: DropdownOption[]| any = [
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
  agencyOptions: any[];
  branchOptions: BranchResource[];
  formData: any;
  maxDate: Date;
  defaultDate: Date;
  constructor(private fb: FormBuilder,
    private deploymentEndpoint: DeploymentEndpoint,
    private cadreEndpoint:CadreEndpoint,
    private gradeLevelEndpoint: GradeLevelEndpoint,
    private readonly http: HttpClient,
    private uploadService: UploadService,
    protected route: ActivatedRoute,
    private messageService: MessageService,
    private stateEndpoint: StateEndpoint,


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
      nin: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(11), Validators.pattern("^[0-9]*$"),this.onlyNumbersValidator()]],
      ippis_no: ['', [Validators.required, Validators.pattern("^[0-9]*$"),this.onlyNumbersValidator()]],
      employee_no: ['', Validators.required],
      ministry_id: ['', Validators.required],
      agency_id: [''],
      branch_id: ['', Validators.required],
      department_id: [''],
      division_id: [''],
      cadre_id: ['', Validators.required],
      grade_level_id: ['', Validators.required]
    });


  }
  numberOnly(event: KeyboardEvent): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false; // This prevents the character from being entered
    }
    return true;
  }
  
  // Custom validator function
  onlyNumbersValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      const hasNonNumeric = /[^0-9]/.test(value);
      return hasNonNumeric ? { 'onlyNumbers': true } : null;
    };
  }

  ngOnInit(): void {
    this.getStates();
    this.getGeoZone();
    this.getMinistry();
    this.getDesignations();
    this.getBranches();
    this.getunit();
    this.getCadre();
  }

  resetForm() {
    this.enrollmentForm.reset();
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

  getCadre() {
    this.cadreEndpoint.list().subscribe((response:any)=>{
      this.cadresOptions = response.data;
    })
  }

  getGradeLevel(Category) {
    this.gradeLevelEndpoint.list().subscribe((response:any)=>{
      console.log(Category)
      this.gradeLevelOptions= response.data;
      this.gradeLevelOptions = this.gradeLevelOptions.filter((GL) => GL.cadre_id === Category);;

    })

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
      this.agencyOptions = ministries.filter((agency) => agency.ministry_id === minID);
      this.branchOptions = this.branchOptions.filter((branch)=> branch.source === 'Ministry')
    })
  }

  changeLocation(){
    this.getBranches()
    this.branchOptions = this.branchOptions.filter((branch)=> branch.source === 'Agency')
  }

  selectedBranchDepartment(branchID) {
    console.log(branchID);
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
  getStates() {
    this.stateEndpoint.list().subscribe((response: any) => {
      this.stateOptions = response.data;
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
    if (this.newQualification.qualification && this.newQualification.institution) {
      this.newQualification.year.getFullYear();

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
    if (this.newCertification.certification) {
      this.newCertification.year.getFullYear();

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
    const gradeLevel = this.gradeLevelOptions.find((gradeLevel) => gradeLevel.id === this.enrollmentForm.value.grade_level_id);
    const cadre = this.cadresOptions.find((cadre) => cadre.id === this.enrollmentForm.value.cadre_id);
    const division = this.divisionOptions.find((division) => division.id === this.enrollmentForm.value.division_id);

    this.formData = {
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
      cadre_id: this.enrollmentForm.value.cadre_id,
      grade_level_id: this.enrollmentForm.value.grade_level_id,
      cadre: cadre.name,
      grade_level: gradeLevel.description,
      request_type: 'General',
      ministry: ministry.name,
      agency: agency?.name,
      agency_id:this.enrollmentForm.value.agency_id,
      branch_id: this.enrollmentForm.value.branch_id,
      department_id: this.enrollmentForm.value.department_id,
      ministry_id: this.enrollmentForm.value.ministry_id,
      division_id: this.enrollmentForm.value.division_id,
      branch: branch?.name,
      department: department?.name,
      division: division?.name,
      qualification: this.qualifications,
      certification: this.certifications,
      passport_file: this.photoUrl,
      date_of_birth: this.enrollmentForm.value.date_of_birth
        ? this.formatDate(this.enrollmentForm.value.date_of_birth) : null,


    };
    this
    if (this.enrollmentForm.valid) {
      this.showPreview = true;



    } else {
      console.log('Form submitted:', this.formData);

      Object.keys(this.enrollmentForm.controls).forEach(field => {
        const control = this.enrollmentForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }

  }


}
