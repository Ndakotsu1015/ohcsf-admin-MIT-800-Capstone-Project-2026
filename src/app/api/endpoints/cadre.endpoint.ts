import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BranchResource } from "../resources/branch.model";
import { BranchRequest} from "../models/requests/branch.model";

@Injectable({
    providedIn: 'root',
})
export class CadreEndpoint {
    baseUrl = `${environment.apiUrl}/cadres`;

    constructor(private readonly httpClient: HttpClient) {}

    list() {
        return this.httpClient.get(`${this.baseUrl}`);
    }

    single(id: number) {
        return this.httpClient.get(`${this.baseUrl}/${id}`);
    }

    create(data: BranchRequest) {
        return this.httpClient.post(`${this.baseUrl}`, data);
    }

    update(id: number, data: BranchRequest) {
        return this.httpClient.put(`${this.baseUrl}/${id}`, data);
    }

    delete(id: number) {
        return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
    }
}
