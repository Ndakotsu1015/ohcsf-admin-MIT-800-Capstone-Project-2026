import { DepartmentResource } from "./department.model";
import { UnitResource } from "./unit.model";

export interface DivisionResource {
    id: number;
    name: string;
    //relation
    department: DepartmentResource;
    unit: UnitResource
    }
