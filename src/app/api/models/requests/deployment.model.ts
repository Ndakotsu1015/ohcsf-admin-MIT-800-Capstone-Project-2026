import { RedeploymentRequest } from "src/app/api/enums/redeployment-request";
import { Status } from "src/app/api/enums/status";
import { Title } from "src/app/api/enums/title";
import { Cadre } from "../../enums/cadre";
import { Gender } from "../../enums/gender";
import { GradeLevel } from "../../enums/grade-level";
import { MaritalStatus } from "../../enums/marital-status";

export interface DeploymentRequest {
    passport_file?: string;
    title?: Title;
    first_name?: string;
    middle_name?: string;
    last_name?: string;
    date_of_birth?: string;
    gender?: Gender;
    marital_status?: MaritalStatus;
    residential_address?: string;
    permanent_address?: string;
    phone_number?: string;
    nationality?: string;
    nin?: string;
    geopolitical_zone_id
    state_id: number;
    lga_id?: number;
    email_address?: string;
    ippis_no?: string;
    employee_no?: string;
    designation_id?: number;
    ministry_id: number;
    agency_id?: number;
    branch_id: number;
    department_id: number;
    division_id: number;
    unit_id?: number;
    employee_id?: number;
    expected_assumption_date?: Date;
    assumption_date?: Date;
    cadre?: Cadre;
    grade_level?: GradeLevel;
    qualification?: string[];
    certification?: string[];
    is_redeployed?: boolean;
    request_type?: RedeploymentRequest;
    benefit?: string;
    request_letter_file?: string;
    status?: Status
}



