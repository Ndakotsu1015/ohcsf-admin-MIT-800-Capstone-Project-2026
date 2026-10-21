import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { AgencyEndpoint } from "src/app/api/endpoints/agency.endpoint";
import { MinistryEndpoint } from "src/app/api/endpoints/ministry.endpoint";
import { AgencyResource } from "src/app/api/resources/agency.model";
import { MinistryResource } from "src/app/api/resources/ministry.model";
import { AppLoadingService } from "src/app/store/services/app-loading.service";

@Component({
    selector: 'app-agency-list',
    templateUrl: './agency-list.component.html',
    styleUrls: ['./agency-list.component.scss']
})
export class AgencyListComponent implements OnInit {
    filterForm: FormGroup;
    agencyForm: FormGroup;
    agencies: AgencyResource[] = [];
    filteredAgencies: AgencyResource[] = [];
    loading: boolean = true;
    globalFilterValue: string = '';
    ministryOptions: MinistryResource[] = [];

    constructor(
        private fb: FormBuilder,
        private messageService: MessageService,
        private router: Router,
        private readonly http: HttpClient,
        private agencyEndpoint: AgencyEndpoint,
        private ministryEndpoint: MinistryEndpoint,
        private readonly appLoadingService: AppLoadingService
    ) {
        this.filterForm = this.fb.group({
            ministry_id: [''],
            agency_id: [''],
            search: [''],
        });

        this.agencyForm = this.fb.group({
            ministry_id: [''],
            agency_id: [''],
        });
    }

    ngOnInit() {
        this.getAgency();
        this.getMinistries();
    }

    getAgency() {
        this.agencyEndpoint.list().subscribe({
            next: (response: any) => {
                console.log("Fetched agencies:", response.data);
                this.agencies = response.data;
                this.filteredAgencies = [...this.agencies];
                this.loading = false;
            },
            error: (err) => {
                console.error("Error fetching agencies:", err);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to fetch agencies'
                });
                this.loading = false;
            }
        });
    }
    getMinistryName(ministryId: number): string {
        const ministry = this.ministryOptions.find(min => min.id === ministryId);
        return ministry ? ministry.name : 'Unknown Ministry';
    }


    applyFilter() {
        const filterValue = this.globalFilterValue.toLowerCase();
        this.filteredAgencies = this.agencies.filter(agency => {
            const agencyName = agency.name?.toLowerCase() || '';
            const ministryName = typeof agency.ministry_id === 'string'
            agency.ministry_id?.name?.toLowerCase() || '';
            return agencyName.includes(filterValue);
        });
    }
    getMinistries() {
        this.ministryEndpoint.list().subscribe({
            next: (response: any) => {
                console.log("Ministries loaded:", response.data);
                this.ministryOptions = response.data;
            },
            error: (err) => {
                console.error("Error fetching ministries:", err);
            }
        });
    }

}
