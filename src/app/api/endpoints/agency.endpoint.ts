import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AgencyResource } from "../resources/agency.model";
import { AgencyRequest } from "../models/requests/agency.model";

@Injectable({
    providedIn: 'root'
})
export class AgencyEndpoint {
    baseUrl = `${environment.apiUrl}/agencies`;

    constructor(private readonly httpClient: HttpClient) {}

    list() {
        return this.httpClient.get<{ data: AgencyResource[] }>(`${this.baseUrl}`);
    }

    single(id: number) {
        return this.httpClient.get<{ data: AgencyResource }>(`${this.baseUrl}/${id}`);
    }

    create(data: AgencyRequest) {
        return this.httpClient.post<{ data: AgencyResource }>(`${this.baseUrl}`, data);
    }

    update(id: number, data: AgencyRequest) {
        return this.httpClient.put<{ data: AgencyResource }>(`${this.baseUrl}/${id}`, data);
    }

    delete(id: number) {
        return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
    }
}
