import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { CreateStateRequest, UpdateStateRequest } from "../models/requests/state.model";
import { StateResource } from "../resources/state.model";

@Injectable({
    providedIn: 'root',
})
export class StateEndpoint {
    baseUrl = `${environment.apiUrl}/states`;

    constructor(private readonly httpClient: HttpClient) {}

    list() {
        return this.httpClient.get<{ data: StateResource[] }>(`${this.baseUrl}`);
    }

    single(id: number) {
        return this.httpClient.get<{ data: StateResource }>(`${this.baseUrl}/${id}`);
    }

    create(data: CreateStateRequest) {
        return this.httpClient.post<{ data: StateResource }>(`${this.baseUrl}`, data);
    }

    update(id: number, data: UpdateStateRequest) {
        return this.httpClient.put<{ data: StateResource }>(`${this.baseUrl}/${id}`, data);
    }

    delete(id: number) {
        return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
    }
}
