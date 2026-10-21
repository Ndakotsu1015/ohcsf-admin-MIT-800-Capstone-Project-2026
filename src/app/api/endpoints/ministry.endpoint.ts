import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { MinistryResource } from "../resources/ministry.model";
import { MinistryRequest } from "../models/requests/ministry.model";

@Injectable({
    providedIn: 'root',
})
export class MinistryEndpoint {
    baseUrl = `${environment.apiUrl}/ministries`;

    constructor(private readonly httpClient: HttpClient) {}

    list() {
        return this.httpClient.get<{ data: MinistryResource[] }>(`${this.baseUrl}`);
    }

    single(id: number) {
        return this.httpClient.get<{ data: MinistryResource }>(`${this.baseUrl}/${id}`);
    }

    create(data: MinistryRequest) {
        return this.httpClient.post<{ data: MinistryResource }>(`${this.baseUrl}`, data);
    }

    update(id: number, data: MinistryRequest) {
        return this.httpClient.put<{ data: MinistryResource }>(`${this.baseUrl}/${id}`, data);
    }

    delete(id: number) {
        return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
    }
}
