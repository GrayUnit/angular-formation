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
  totalHT(): number {
    console.log('total ht called');

    return this.tjm_ht * this.nb_days;
  }
  totalTTC(): number {
    console.log('total ttc called');
    return this.tjm_ht * this.nb_days * (1 + this.taux_tva / 100);
  }
}
