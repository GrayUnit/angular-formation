import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { StateOrder } from 'src/app/core/enums/state-order';
import { Order } from 'src/app/core/models/order';
import { ColOrdersService } from 'src/app/core/services/col-orders.service';
import { AppState } from 'src/app/core/store';
import { LoadDeleteOrderAction, loadInitOrdersAction } from 'src/app/core/store/actions/orders.action';
import { selectOrderListEntities$, selectOrderLoading$, selectOrderObject$ } from 'src/app/core/store/selectors/order.selector';

@Component({
  selector: 'app-page-list-orders',
  templateUrl: './page-list-orders.component.html',
  styleUrls: ['./page-list-orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageListOrdersComponent implements OnInit {
  public collection$: Observable<Order[]>;
  public loading$: Observable<boolean>;
  public states = Object.values(StateOrder);
  // private sub!: Subscription;
  public titre = 'List Orders';
  // public collection!: Order[];
  public counter: BehaviorSubject<any> = new BehaviorSubject({nombre: {value: 0}});
  public entetes = [
    'Action',
    'Type',
    'Client',
    'NbJours',
    'Tjm HT',
    'Total HT',
    'Total TTC',
    'State',
    'Detail'
  ];
  constructor(
    private ordersService: ColOrdersService,
    private router: Router,
    private currentRoute: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private store: Store<AppState>
  ) {
    //this.collection$ = this.ordersService.collection;
    // this.sub = this.ordersService.collection.subscribe((data) => {
    //   this.collection = data;
    // });
    this.collection$ = this.store.pipe(select(selectOrderObject$));
    this.loading$ = this.store.pipe(select(selectOrderLoading$));
    this.loading$.subscribe(
      (loading) => {
        console.log(loading);
      }
    )
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

  public incrementCounter() {
    this.counter.next({
      nombre: {
        value: this.counter.value.nombre.value + 1
      }
    })
  }

  public goToEdit(id: number): void {
    this.router.navigate(['list-orders', 'edit-order', id]);
  }
  public deleteItem(id: number): void {
    this.ordersService.delete(id).subscribe();
  }
  public deleteOrder(id: number): void {
    this.store.dispatch(LoadDeleteOrderAction({id: id}));
  }
  ngOnInit(): void {
    this.currentRoute.data.subscribe(
      (data) => {
        this.titre = data.title;
      }
    )
    this.store.dispatch(loadInitOrdersAction());
  }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }

  public detacher() {
    this.cd.detach();
  }

  public getDetails(item: Order): void {
    // Attention entraine le rechargement du parent ! 
    // this.router.navigate(["list-orders", "detail"]);
    this.ordersService.getDetails(item);
  }

  public check() {
    console.log("CD List Order");
  }
}
