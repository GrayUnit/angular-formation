import { StateClient } from '../enums/state-client';

export interface ClientI {
  state: StateClient;
  taux_tva: number;
  id: number;
  name: string;
  total_ca_ht: number;
  email: string;
  totalTTC(): number;
}
