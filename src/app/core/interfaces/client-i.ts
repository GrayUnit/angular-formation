import { StateClient } from "../enums/state-client";

export interface ClientI {
    state: StateClient;
    id: number;
    taux_tva: number;
    name: string;
    total_ca_ht: number;
    email: string;
    totalTTC(): number;
}
