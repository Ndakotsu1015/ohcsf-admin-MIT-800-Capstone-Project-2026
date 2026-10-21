import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { DesignationResource } from "../resources/designation.model";
import { DesgnationRequest } from "../models/requests/designation.model";

@Injectable({
    providedIn: 'root',
})
export class DesignationEndpoint {
    baseUrl = `${environment.apiUrl}/designations`;

    constructor(private readonly httpClient: HttpClient) {}

    list() {
        return this.httpClient.get<{ data: DesignationResource[] }>(`${this.baseUrl}`);
    }

    single(id: number) {
        return this.httpClient.get<{ data: DesignationResource }>(`${this.baseUrl}/${id}`);
    }

    create(data: DesgnationRequest) {
        return this.httpClient.post<{ data: DesignationResource }>(`${this.baseUrl}`, data);
    }

    update(id: number, data: DesgnationRequest) {
        return this.httpClient.put<{ data: DesignationResource }>(`${this.baseUrl}/${id}`, data);
    }

    delete(id: number) {
        return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
    }
}
