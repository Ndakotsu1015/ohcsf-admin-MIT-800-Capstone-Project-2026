import { StateResource } from "./state.model";

export interface GeoPoliticalZoneResource
{
id: number;
name: string;
states: StateResource;
}
