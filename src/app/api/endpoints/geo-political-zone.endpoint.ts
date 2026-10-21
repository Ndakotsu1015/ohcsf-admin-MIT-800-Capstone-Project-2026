import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { GeoPoliticalZoneResource } from "../resources/geopolitcalzone.model";
import { GeopoliticalZoneRequest } from "../models/requests/geo-political-zone.model";

@Injectable({
    providedIn: 'root',
})
export class GeoPoliticalZoneEndpoint {
    baseUrl = `${environment.apiUrl}/geopolitical-zones`;

    constructor(private readonly httpClient: HttpClient) {}

    list() {
        return this.httpClient.get<{ data: GeoPoliticalZoneResource[] }>(`${this.baseUrl}`);
    }

    single(id: number) {
        return this.httpClient.get<{ data: GeoPoliticalZoneResource }>(`${this.baseUrl}/${id}`);
    }

    create(data: GeopoliticalZoneRequest) {
        return this.httpClient.post<{ data: GeoPoliticalZoneResource }>(`${this.baseUrl}`, data);
    }

    update(id: number, data: GeopoliticalZoneRequest) {
        return this.httpClient.put<{ data: GeoPoliticalZoneResource }>(`${this.baseUrl}/${id}`, data);
    }

    delete(id: number) {
        return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
    }
}
