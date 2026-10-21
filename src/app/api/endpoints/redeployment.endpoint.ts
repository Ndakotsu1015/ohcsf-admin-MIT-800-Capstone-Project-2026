import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { DeploymentResource } from "../resources/deployment.model";
import { DeploymentRequest } from "../models/requests/deployment.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class ReDeploymentRequestEndpoint {
    baseUrl = `${environment.apiUrl}/redeployment-requests`;

    constructor(private readonly httpClient: HttpClient) {}

    filterDeployments(filters: any): Observable<any> {
        let params = new HttpParams();

        Object.keys(filters).forEach((key) => {
            if (filters[key] !== null && filters[key] !== undefined) {
                params = params.set(key, filters[key]);
            }
        });
        console.log(filters);

        return this.httpClient.get<any>(this.baseUrl, { params:{
            cadre: filters.value.cadre,
            mda_id: filters.value.ministry_id,
            agency_id: filters.value.agency_id,
            grade_level: filters.value.grade_level,
            branch_id: filters.value.branch_id,
            department_id: filters.value.department_id,
            division_id: filters.value.division_id,
            unit_id: filters.value.unit_id,
            gender: filters.value.gender,
        } });
    }
    search(searchTerm: string) {
        return this.httpClient.get<{ data: DeploymentResource[] }>(
            `${this.baseUrl}?search=${searchTerm}`
        );
    }

    list() {
        return this.httpClient.get(
            `${this.baseUrl}`
        );
    }
    listProposed() {
        return this.httpClient.get<{ data: DeploymentResource[] }>(
            `${environment.apiUrl}/proposed-list`
        );
    }

    single(id: number){
        return this.httpClient.get(
            `${this.baseUrl}/${id}`
        );
    }
    create(data: DeploymentRequest) {
        return this.httpClient.post<{ data: DeploymentResource }>(
            `${this.baseUrl}`,
            data
        );
    }

    update( id, status) {
        return this.httpClient.put(
            `${this.baseUrl}/${id}/toggle-status`, {status}
        );
    }

    
}
