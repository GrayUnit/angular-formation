import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { StateOrder } from 'src/app/core/enums/state-order';
import { Order } from 'src/app/core/models/order';
import { ColOrdersService } from 'src/app/core/services/col-orders.service';
import { NgrxOrderService } from 'src/app/core/services/ngrx-order.service';
import { AppState } from 'src/app/core/store';
import { LoadDeleteOrderAction, loadInitOrdersAction } from 'src/app/core/store/actions/orders.actions';
import { getOrders$, selectOrderListEntities$ } from 'src/app/core/store/selectors/orders.selectors';

@Component({
  selector: 'app-page-list-orders',
  templateUrl: './page-list-orders.component.html',
  styleUrls: ['./page-list-orders.component.scss'],
})
export class PageListOrdersComponent implements OnInit {
  //public collection$: Subject<Order[]>;
  public collection$: Observable<Order[]>;
  public states = Object.values(StateOrder);
  // private sub!: Subscription;
  public titre = 'List Orders';
  public collection!: Order[];
  public counter: BehaviorSubject<any> = new BehaviorSubject({nombre: 0});
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
  constructor(
    private ordersService: ColOrdersService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>) {

      //this.collection$ = this.ordersService.collection;
      this.collection$ = this.store.pipe(select(getOrders$));
    // this.ordersService.collection.subscribe((data) => {
    //   this.collection = data;
    // });
  }


  public deleteOrder(id: number) {
    this.store.dispatch(LoadDeleteOrderAction({id: id}));
  }

  public incrementCounter() {
    this.counter.next({nombre: this.counter.value.nombre + 1});
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
    // this.ordersService.delete(id).subscribe((res) => {
    //   // this.collection$ = this.ordersService.collection;
    // });
    this.store.dispatch(LoadDeleteOrderAction({id: id}));
  }

  public getDetails(item: Order): void {
    this.ordersService.myItem$.next(item);
  }
  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.titre = data.title;
    });
    this.store.dispatch(loadInitOrdersAction());
  }
  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }
}
