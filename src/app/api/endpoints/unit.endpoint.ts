import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { CreateUnitRequest, UpdateUnitRequest } from "../models/requests/unit.model";
import { UnitResource } from "../resources/unit.model";


@Injectable({
    providedIn: 'root',
})
export class UnitEndpoint {
    baseUrl = `${environment.apiUrl}/units`;

    constructor(private readonly httpClient: HttpClient) {}

    list() {
        return this.httpClient.get<{ data: UnitResource[] }>(`${this.baseUrl}`);
    }

    single(id: number) {
        return this.httpClient.get<{ data: UnitResource }>(`${this.baseUrl}/${id}`);
    }

    create(data: CreateUnitRequest) {
        return this.httpClient.post<{ data: UnitResource }>(`${this.baseUrl}`, data);
    }

    update(id: number, data: UpdateUnitRequest) {
        return this.httpClient.put<{ data: UnitResource }>(`${this.baseUrl}/${id}`, data);
    }

    delete(id: number) {
        return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
    }
}
