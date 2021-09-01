import { StateOrder } from '../enums/state-order';

export interface OrderI {
  id: number;
  type: string;
  client: string;
  taux_tva: number;
  comment: string;
  nb_days: number;
  tjm_ht: number;
  state: StateOrder;
}
