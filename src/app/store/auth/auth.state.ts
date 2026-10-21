import { UserResource } from "src/app/components/auth/auth.model";

export interface AppAuthState {
    access_token: string | null;
    user: UserResource | null;
}
