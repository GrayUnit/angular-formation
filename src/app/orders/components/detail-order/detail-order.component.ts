import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Order } from 'src/app/core/models/order';
import { ColOrdersService } from 'src/app/core/services/col-orders.service';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.scss']
})
export class DetailOrderComponent implements OnInit {

  public myItem$ = new Subject<Order>();
  constructor(
    private orderService: ColOrdersService
  ) { }

  ngOnInit(): void {
    this.myItem$ = this.orderService.myItem$;
  }

}
