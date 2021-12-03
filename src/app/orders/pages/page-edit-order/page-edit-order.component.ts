import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Order } from 'src/app/core/models/order';
import { ColOrdersService } from 'src/app/core/services/col-orders.service';
import { AppState } from 'src/app/core/store';
import { LoadUpdateOrderAction } from 'src/app/core/store/actions/orders.action';

@Component({
  selector: 'app-page-edit-order',
  templateUrl: './page-edit-order.component.html',
  styleUrls: ['./page-edit-order.component.scss'],
})
export class PageEditOrderComponent implements OnInit {
  public item$!: Observable<Order>;
  constructor(
    private route: ActivatedRoute,
    private ordersService: ColOrdersService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.item$ = this.ordersService.getItemById(id);
    });
  }

  ngOnInit(): void {}

  public update(item: Order): void {
    this.ordersService.update(item).subscribe((res) => {
      this.router.navigate(['list-orders']);
    });
  }

  public updateOrder(item: Order): void {
    this.store.dispatch(LoadUpdateOrderAction({order: item}));
    this.router.navigate(['list-orders']);
  }
}
