import { MinistryResource } from "./ministry.model";

export interface AgencyResource{
    id: number;
    name: string;
    ministry_id: MinistryResource;
}
