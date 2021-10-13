import { StateClient } from "../enums/state-client";

export interface ClientI {
    state: StateClient;
    taux_tva: number;
    name: string;
    id: number;
    total_ca_ht: number;
    email: string;
    totalTTC(): number;
}
