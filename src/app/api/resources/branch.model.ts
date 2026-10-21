import { AgencyResource } from "./agency.model";
import { MinistryResource } from "./ministry.model";

export interface BranchResource {
    id: number;
    name: string;
    source: string;
    relation: MinistryResource | AgencyResource;
}

