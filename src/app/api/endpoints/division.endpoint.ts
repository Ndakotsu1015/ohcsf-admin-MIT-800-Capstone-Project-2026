import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { DivisionResource } from "../resources/division.model";
import { DivisionRequest } from "../models/requests/division.model";

@Injectable({
    providedIn: 'root',
})
export class DivisionEndpoint {
    baseUrl = `${environment.apiUrl}/divisions`;

    constructor(private readonly httpClient: HttpClient) {}

    list() {
        return this.httpClient.get<{ data: DivisionResource[] }>(`${this.baseUrl}`);
    }

    single(id: number) {
        return this.httpClient.get<{ data: DivisionResource }>(`${this.baseUrl}/${id}`);
    }

    create(data: DivisionRequest) {
        return this.httpClient.post<{ data: DivisionResource }>(`${this.baseUrl}`, data);
    }

    update(id: number, data: DivisionRequest) {
        return this.httpClient.put<{ data: DivisionResource }>(`${this.baseUrl}/${id}`, data);
    }

    delete(id: number) {
        return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
    }
}
