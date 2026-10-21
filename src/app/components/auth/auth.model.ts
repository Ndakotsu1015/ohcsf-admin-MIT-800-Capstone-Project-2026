import { UserTypes } from "../../api/enums/user-types";

export interface UserLogInDto {
    user: UserResource;
    access_token: string;
}

export interface UserRequest {
    email: string;
    password: string;
}

export interface UserResource {
    id: number;
    email: string;
    name: string;
    user_type: UserTypes | null;
    is_active: boolean;
    email_verified: boolean;
    profile_picture?: string;
}

export interface loginrequest {
    email: string;
    password: string;
}

export interface ChangePasswordRequest {
    password: string;
    newpassword: string;
    confirmpassword: string;
}

export interface ResetPasswordRequest {
    email: string;
    password: string;
    password_confirmation: string;
    token: string;
}

export interface Message {
    severity?: string;
    summary?: string;
    detail?: string;
    id?: any;
    key?: string;
    life?: number;
    sticky?: boolean;
    closable?: boolean;
    data?: any;
    icon?: string;
    contentStyleClass?: string;
    styleClass?: string;
}

export interface ResendEmailRequestDto {
    full_name?: string;
    email: string;
}
export interface VerifyTokenRequestDto {
    token: string;
}

export interface ResetPasswordResponseDto {
    token: string;
    email: string;
}
