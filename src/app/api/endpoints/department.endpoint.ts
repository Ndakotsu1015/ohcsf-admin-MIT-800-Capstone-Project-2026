import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { DepartmentResource } from "../resources/department.model";
import { DepartmentRequest } from "../models/requests/department.model";

@Injectable({
    providedIn: 'root',
})
export class DepartmentEndpoint {
    baseUrl = `${environment.apiUrl}/departments`;

    constructor(private readonly httpClient: HttpClient) {}

    list() {
        return this.httpClient.get<{ data: DepartmentResource[] }>(`${this.baseUrl}`);
    }

    single(id: number) {
        return this.httpClient.get<{ data: DepartmentResource }>(`${this.baseUrl}/${id}`);
    }

    create(data: DepartmentRequest) {
        return this.httpClient.post<{ data: DepartmentResource }>(`${this.baseUrl}`, data);
    }

    update(id: number, data: DepartmentRequest) {
        return this.httpClient.put<{ data: DepartmentResource }>(`${this.baseUrl}/${id}`, data);
    }

    delete(id: number) {
        return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
    }
}
