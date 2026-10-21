import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { CreateLgaRequest, UpdateLgaRequest } from "../models/requests/lga.model";
import { LgaResource } from "../resources/lga.model";
@Injectable({
    providedIn: 'root',
})
export class LgaEndpoint {
    baseUrl = `${environment.apiUrl}/lgas`;

    constructor(private readonly httpClient: HttpClient) {}

    list() {
        return this.httpClient.get<{ data: LgaResource[] }>(`${this.baseUrl}`);
    }

    single(id: number) {
        return this.httpClient.get<{ data: LgaResource }>(`${this.baseUrl}/${id}`);
    }

    create(data: CreateLgaRequest) {
        return this.httpClient.post<{ data: LgaResource }>(`${this.baseUrl}`, data);
    }

    update(id: number, data: UpdateLgaRequest) {
        return this.httpClient.put<{ data: LgaResource }>(`${this.baseUrl}/${id}`, data);
    }

    delete(id: number) {
        return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
    }
}
