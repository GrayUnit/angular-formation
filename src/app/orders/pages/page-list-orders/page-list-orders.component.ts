import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { StateOrder } from 'src/app/core/enums/state-order';
import { Order } from 'src/app/core/models/order';
import { ColOrdersService } from 'src/app/core/services/col-orders.service';

@Component({
  selector: 'app-page-list-orders',
  templateUrl: './page-list-orders.component.html',
  styleUrls: ['./page-list-orders.component.scss'],
})
export class PageListOrdersComponent implements OnInit {
  public collection$: Subject<Order[]>;
  public states = Object.values(StateOrder);
  // private sub!: Subscription;
  public titre = 'List Orders';
  public collection!: Order[];
  public counter = {
    nombre: 1
  }
  public entetes = [
    'Action',
    'Type',
    'Client',
    'NbJours',
    'Tjm HT',
    'Total HT',
    'Total TTC',
    'State',
  ];
  constructor(private ordersService: ColOrdersService, private router: Router, private route: ActivatedRoute) {
    this.collection$ = this.ordersService.collection;
    // this.ordersService.collection.subscribe((data) => {
    //   this.collection = data;
    // });
  }

  public incrementCounter() {
    this.counter.nombre = this.counter.nombre + 1;
  }

  public changeTitle(): void {
    this.titre = 'New List Orders';
  }

  public changeState(item: Order, event: any): void {
    const state = event.target.value;
    this.ordersService.changeState(item, state).subscribe((data) => {
      // gerer les erreur api (qu'on basculera ensuite dans un pipe au niveau du service)
      Object.assign(item, data);
    });
  }

  public goToEdit(id: number): void {
    this.router.navigate(['list-orders', 'edit-order', id]);
  }
  public deleteItem(id: number): void {
    this.ordersService.delete(id).subscribe((res) => {
      // this.collection$ = this.ordersService.collection;
    });
  }

  public getDetails(item: Order): void {
    this.ordersService.myItem$.next(item);
  }
  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.titre = data.title;
    });
  }
  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }
}
