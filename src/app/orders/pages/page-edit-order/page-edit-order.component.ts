import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Order } from 'src/app/core/models/order';
import { ColOrdersService } from 'src/app/core/services/col-orders.service';

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
    private router: Router
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
}
