
import { GeoPoliticalZoneResource } from "./geopolitcalzone.model";
import { LgaResource } from "./lga.model";

export interface StateResource {
    id: number;
    name: string;
    //relation
    geopolitical_zone_id: number;
    zone: GeoPoliticalZoneResource;
    lgas: LgaResource;

}

