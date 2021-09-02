import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Order } from 'src/app/core/models/order';
import { ColOrdersService } from 'src/app/core/services/col-orders.service';

@Component({
  selector: 'app-page-list-orders',
  templateUrl: './page-list-orders.component.html',
  styleUrls: ['./page-list-orders.component.scss'],
})
export class PageListOrdersComponent implements OnInit {
  public collection$: Observable<Order[]>;
  // private sub!: Subscription;
  public titre = 'List Orders';
  // public collection!: Order[];
  public entetes = [
    'Type',
    'Client',
    'NbJours',
    'Tjm HT',
    'Total HT',
    'Total TTC',
    'State',
  ];
  constructor(private ordersService: ColOrdersService) {
    this.collection$ = this.ordersService.collection;
    // this.sub = this.ordersService.collection.subscribe((data) => {
    //   this.collection = data;
    // });
  }

  public changeTitle(): void {
    this.titre = 'New List Orders';
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }
}
