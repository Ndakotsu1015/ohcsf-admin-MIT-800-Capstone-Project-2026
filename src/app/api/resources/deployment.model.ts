import { Cadre } from "../enums/cadre";
import { Gender } from "../enums/gender";
import { GradeLevel } from "../enums/grade-level";
import { MaritalStatus } from "../enums/marital-status";
import { Status } from "../enums/status";
import { Title } from "../enums/title";
import { DesignationResource } from "./designation.model";
import { LgaResource } from "./lga.model";
import { UnitResource } from "./unit.model";


export interface DeploymentCountResponse {
    total_deployments: number;
  }
export interface ProposedRedeploymentCountResponse {

    total_proposed_redeployments: number;
  }
export interface RedeployedDeploymentCountResponse {

    total_redeployed_deployments: number;
  }
export interface DeploymentResource {
    id: number;
    passport_file?: string;
    title: Title;
    first_name: string;
    middle_name?: string;
    last_name: string;
    date_of_birth: Date;
    assuption_duty_date: Date;
    deployment_report_date: Date;
    gender: Gender;
    marital_status: MaritalStatus;
    residential_address: string;
    permanent_address: string;
    phone_number: string;
    nationality: string;
    nin: string;
    email_address: string;
    ippis_no: string;
    employee_no: string;
    employee_id?: number;
    expected_assumption_date?: Date;
    assumption_date?: Date;
    qualification?: string[];
    certification?: string[];
    is_redeployed?: boolean;
    request_type?: string;
    benefit?: string;
    request_letter_file?: string;
    status?: Status;

    // Relations
    unit: UnitResource;
    designation: DesignationResource;
    lga: LgaResource

}


