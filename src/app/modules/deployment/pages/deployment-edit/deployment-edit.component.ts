import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { AgencyEndpoint } from 'src/app/api/endpoints/agency.endpoint';
import { CadreEndpoint } from 'src/app/api/endpoints/cadre.endpoint';
import { DepartmentEndpoint } from 'src/app/api/endpoints/department.endpoint';
import { DeploymentEndpoint } from 'src/app/api/endpoints/deployment.endpoint';
import { DesignationEndpoint } from 'src/app/api/endpoints/desgnation.endpoint';
import { DivisionEndpoint } from 'src/app/api/endpoints/division.endpoint';
import { GeoPoliticalZoneEndpoint } from 'src/app/api/endpoints/geo-political-zone.endpoint';
import { GradeLevelEndpoint } from 'src/app/api/endpoints/grade-level.endpoint';
import { LgaEndpoint } from 'src/app/api/endpoints/lga.endpoint';
import { MinistryEndpoint } from 'src/app/api/endpoints/ministry.endpoint';
import { StateEndpoint } from 'src/app/api/endpoints/state.endpoint';
import { UnitEndpoint } from 'src/app/api/endpoints/unit.endpoint';
import { Cadre } from 'src/app/api/enums/cadre';
import { Gender } from 'src/app/api/enums/gender';
import { MaritalStatus } from 'src/app/api/enums/marital-status';
import { RequestType } from 'src/app/api/enums/request-type';
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
import { AppLoadingService } from 'src/app/store/services/app-loading.service';
import { environment } from 'src/environments/environment';

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
  selector: 'app-enrollment-edit',
  templateUrl: './deployment-edit.component.html',
  styleUrls: ['./deployment-edit.component.scss'],
  providers: [MessageService]
})
export class DeploymentEditComponent implements OnInit {
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
    geoPoliticalZone: GeoPoliticalZoneResource[] = [];
    geoStates: StateResource[] = [];
    _geoStates: StateResource[] = [];
    geoLgas: LgaResource[] = [];
  showPreview: boolean = false;
  userId: number;
  loading: boolean = true;
  employee_id:number;

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
  agencyOptions: any[] = [];
  branchOptions: BranchResource[] = [];
  formData: any;
  maxDate: Date;
  defaultDate: Date;
  geopolitcalzone: GeoPoliticalZoneResource;
  geozoneID: number;
  skeleton = true;

  constructor(
    private fb: FormBuilder,
    private deploymentEndpoint: DeploymentEndpoint,
    private ministryEndpoint: MinistryEndpoint,
    private agencyEndpoint: AgencyEndpoint,
    private departmentEndpoint: DepartmentEndpoint,
    private divisionEndpoint: DivisionEndpoint,
    private designationEndPoint: DesignationEndpoint,
    private readonly http: HttpClient,
    private uploadService: UploadService,
      protected route: ActivatedRoute,
     private cadreEndpoint:CadreEndpoint,
    private router: Router,
    private messageService: MessageService,
    private geoPoliticalZoneEndpoint: GeoPoliticalZoneEndpoint,
    private stateEndpoint: StateEndpoint,
    private unitEndpoint: UnitEndpoint,
      private lgaEndpoint: LgaEndpoint,
        private gradeLevelEndpoint: GradeLevelEndpoint,

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
        request_type: [''],
        email_address: ['', [Validators.required, Validators.email]],
        nin: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(11), Validators.pattern("^[0-9]*$")]],
        ippis_no: ['', Validators.required],
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

  ngOnInit(): void {
    this.appLoadingService.startLoading('Fetching...');
      this.loading = true;
      this.getCadre();
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

    forkJoin([
        this.geoPoliticalZoneEndpoint.list(),
        this.stateEndpoint.list(),
        this.lgaEndpoint.list(),
        this.ministryEndpoint.list(),
        this.agencyEndpoint.list(),
        this.departmentEndpoint.list(),
        this.divisionEndpoint.list(),
        this.unitEndpoint.list(),
        this.designationEndPoint.list(),
    ])
    .subscribe({
        next: (response) => {
            this.geoPoliticalZone = response[0].data;
            this._geoStates = response[1].data;
            this.geoLgas = response[2].data;
            this.ministryOptions = response[3].data;
            this.agencyOptions = response[4].data;
            this.departmentOptions = response[5].data;
            this.divisionOptions = response[6].data;
            this.unitOptions = response[7].data;
            this.designationOptions = response[8].data;
        },

      });

    // Load all reference data
    this.loadReferenceData();
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
            this.gradeLevelOptions = this.gradeLevelOptions.filter((GL) => GL.cadre_id === Category || GL.cadre_id);
            console.log('this', this.gradeLevelOptions);


        })

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
    this.appLoadingService.startLoading('Fetching...');

    this.deploymentEndpoint.single(userId).subscribe(
      (response: any) => {
        const userData = response.data;
        this.employee_id = userData.employee.id

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
          this.getGradeLevel(null);
        }

        // Load qualifications and certifications
        if (userData.qualification) {
          let newQual;

          // Check if qualification is a string (stringified array)
          if (typeof userData.qualification === 'string') {
            try {
              const qualificationString = userData.qualification.replace(/'/g, '"');
              newQual = JSON.parse(qualificationString);
            } catch (error) {
              console.error('Error parsing qualification:', error);
              newQual = []; // Fallback to empty array if parsing fails
            }
          }
          // If it's already an array, use it directly
          else if (Array.isArray(userData.qualification)) {
            newQual = userData.qualification;
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


        if (userData.certification) {
          let newCert;

          // Check if certification is a string (stringified array)
          if (typeof userData.certification === 'string') {
            try {
              const certificationString = userData.certification.replace(/'/g, '"');
              newCert = JSON.parse(certificationString);
            } catch (error) {
              console.error('Error parsing certification:', error);
              newCert = []; // Fallback to empty array if parsing fails
            }
          }
          // If it's already an array, use it directly
          else if (Array.isArray(userData.certification)) {
            newCert = userData.certification;
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

this.skeleton = false;
    if (!userData.qualification ){
      this.qualifications =[];
      this.certifications = [];
      }
      console.log(userData)
    // geopolitcalzone = this.stateOptions?.find((zone) => zone.id === userData.employee.lga.state_id);
    const geoZone = this.zoneOptions?.find((zone) => zone.id === userData.employee.lga.state_id);
      console.log('geopolitcalzone', geoZone);

      const grade_level = this.gradeLevelOptions.find((GL) => GL.cadre_id === userData.cadre.id)
      console.log('grade',this.gradeLevelOptions);

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
      ministry_id: userData.unit.division_id?.department.branch.agency?.ministry?.id ||userData.unit.division_id?.department.branch.ministry?.id  ,
      agency_id: userData?.agency_id,
      branch_id:  userData.unit.division_id?.department.branch.id,
      department_id: userData.unit.division_id?.department_id,
      division_id: userData.unit.division_id?.id,
      cadre_id: userData.cadre.id,
      passport_file: this.photoUrl,
      grade_level_id: userData.gradeLevel.id,
      formType: userData.id,
      qualification: this.qualifications || [],
      certification: this.certifications || [],
    });
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
        console.log(this.enrollmentForm);
        Object.keys(this.enrollmentForm.controls).forEach(key => {
          const control = this.enrollmentForm.get(key);
          console.log(`${key}: valid=${control?.valid}, errors=`, control?.errors);
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
      cadre_id: this.enrollmentForm.value.cadre_id,
      grade_level_id: this.enrollmentForm.value.grade_level_id,
      cadre: cadre.name,
      grade_level: this.enrollmentForm.value.grade_level_id,
      request_type: this.enrollmentForm.value.request_type,
      ministry: ministry?.name,
      ministry_id: ministry?.id,
      agency: agency?.name,
      branch: branch?.name,
      department: department?.name,
      division: division?.name,
      employee_id: this.employee_id,
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



  cancelEdit(): void {
    // Navigate back without saving
   window.history.back();
  }
}
