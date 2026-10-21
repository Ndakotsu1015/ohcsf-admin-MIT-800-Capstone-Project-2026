import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AgencyEndpoint } from 'src/app/api/endpoints/agency.endpoint';
import { MinistryEndpoint } from 'src/app/api/endpoints/ministry.endpoint';
import { AgencyRequest } from 'src/app/api/models/requests/agency.model';
import { AgencyResource } from 'src/app/api/resources/agency.model';
import { MinistryResource } from 'src/app/api/resources/ministry.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-agency-form',
  templateUrl:'./agency-form.component.html',
  styleUrl: './agency-form.component.scss'
})
export class AgencyFormComponent {
    isLoading: boolean = false;
    agencyForm: FormGroup;
    showPreview: boolean = false;
    ministryOptions: MinistryResource[] = [];
    agencyOptions: AgencyResource[] = [];
    agency: AgencyResource;
    formData: any;

      constructor(private fb: FormBuilder,
        private agencyEndPoint: AgencyEndpoint,
          private ministryEndPoint: MinistryEndpoint,
          private messageService: MessageService,
        private readonly http: HttpClient,
      ) {

        this.agencyForm = this.fb.group({
          name: ['', Validators.required],
          ministry_id: ['', Validators.required],
        });
      }
      ngOnInit(): void {
        this.getMinistries();
    }

      getMinistries() {
        this.ministryEndPoint.list().subscribe({
            next: (response: any) => {
                this.ministryOptions = response.data;
            },
            error: (err) => {
                console.error("Error fetching ministries:", err);
            }
        });
    }

    onSubmit(): void {
        if (this.agencyForm.invalid) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Validation Error',
                detail: 'Please fill all required fields correctly'
            });
            return;
        }

        this.isLoading = true;
        const agencyData: AgencyRequest = { ...this.agencyForm.value };
        console.log('Submitting agency data:', agencyData);
        this.agencyEndPoint.create(agencyData).subscribe({
            next: (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Agency created successfully!'
                });

                this.agencyForm.reset();
                this.agencyForm.markAsPristine();
                this.agencyForm.markAsUntouched();
            },
            error: (err) => {
                const errorMessage = err.error?.message || 'Failed to create agency';
                console.error('Error creating agency:', errorMessage);

                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: errorMessage
                });
            },
            complete: () => {
                this.isLoading = false;
            }
        });
    }

}
