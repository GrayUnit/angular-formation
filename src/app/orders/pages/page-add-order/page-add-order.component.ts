import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Order } from 'src/app/core/models/order';
import { ColOrdersService } from 'src/app/core/services/col-orders.service';
import { AppState } from 'src/app/core/store';
import { LoadAddOrderAction } from 'src/app/core/store/actions/orders.action';

@Component({
  selector: 'app-page-add-order',
  templateUrl: './page-add-order.component.html',
  styleUrls: ['./page-add-order.component.scss'],
})
export class PageAddOrderComponent implements OnInit {
  constructor(
    private ordersService: ColOrdersService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {}

  public add(item: Order): void {
    this.ordersService.add(item).subscribe((res) => {
      this.router.navigate(['list-orders']);
    });
  }

  public addOrder(item: Order) {
    this.store.dispatch(LoadAddOrderAction({item: item}));
    this.router.navigate(['list-orders']);
  }

  public check() {
    console.log("CD Add Order");
  }
}
