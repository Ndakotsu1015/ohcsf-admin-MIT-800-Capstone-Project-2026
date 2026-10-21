import { LgaResource } from "../../resources/lga.model";

export interface CreateStateRequest {
    name: string;
    geopolitical_zone_id: number;
    lgas: LgaResource
}
export interface UpdateStateRequest {
    name: string;
    geopolitical_zone_id: number;
    lgas: LgaResource
}
