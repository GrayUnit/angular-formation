import { StateClient } from '../enums/state-client';
import { ClientI } from '../interfaces/client-i';

export class Client implements ClientI {
  state = StateClient.ACTIVE;
  taux_tva = 20;
  id!: number;
  name!: string;
  total_ca_ht = 0;
  email!: string;
  constructor(obj?: Partial<Client>) {
    if (obj) {
      Object.assign(this, obj);
    }
  }
  totalTTC(): number {
    return this.total_ca_ht * (1 + this.taux_tva / 100);
  }
}
