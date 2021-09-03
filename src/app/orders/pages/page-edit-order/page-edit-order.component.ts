import { Component, OnInit } from '@angular/core';
import { StateOrder } from 'src/app/core/enums/state-order';
import { Order } from 'src/app/core/models/order';

@Component({
  selector: 'app-page-edit-order',
  templateUrl: './page-edit-order.component.html',
  styleUrls: ['./page-edit-order.component.scss'],
})
export class PageEditOrderComponent implements OnInit {
  public item: Order;
  constructor() {
    // mock item
    this.item = new Order({
      taux_tva: 20,
      nb_days: 20,
      tjm_ht: 1200,
      state: StateOrder.OPTION,
      type: 'formation2',
      client: 'Capgemini2',
      comment: 'Merci Cap pour les 24k',
      id: 1,
    });
  }

  ngOnInit(): void {}
}
