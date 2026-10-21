import { DivisionResource } from "./division.model";

export interface DepartmentResource {
    id: number;
    name: string;
    //relation
    branch_id: number;
    divisions: DivisionResource; // Assuming Division is another interface or model
  }
