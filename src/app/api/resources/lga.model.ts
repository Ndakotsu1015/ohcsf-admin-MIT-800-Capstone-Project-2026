import { StateResource } from "./state.model";

export interface LgaResource {
    id: number;
    name: string;
    state_id: number;
    //relation
    state: StateResource

}
