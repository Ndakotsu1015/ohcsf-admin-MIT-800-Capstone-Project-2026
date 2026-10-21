import { DivisionResource } from "./division.model";

export interface UnitResource {
id: number;
name: string;
//relation
division: DivisionResource;
}
