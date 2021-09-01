import { StateOrder } from '../enums/state-order';
import { OrderI } from '../interfaces/order-i';

export class Order implements OrderI {
  id!: number;
  type!: string;
  client!: string;
  taux_tva = 20;
  comment!: string;
  nb_days = 1;
  tjm_ht = 1200;
  state = StateOrder.OPTION;
  constructor(obj?: Partial<Order>) {
    if (obj) {
      Object.assign(this, obj);
    }
  }
}
