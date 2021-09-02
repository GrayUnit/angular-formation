import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ColErrorHandler } from '../abstracts/col-error-handler';
import { StateOrder } from '../enums/state-order';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class ColOrdersService extends ColErrorHandler {
  private data$!: Observable<Order[]>;
  private urlApi = environment.urlApi;
  constructor(private http: HttpClient) {
    super();
    this.collection = this.http.get<Order[]>(`${this.urlApi}/orders`).pipe(
      map((tab) => {
        return tab.map((obj) => {
          return new Order(obj);
        });
      }),
      catchError(this.handleError)
    );
  }
  // public get collection
  get collection(): Observable<Order[]> {
    return this.data$;
  }

  // public set collection
  set collection(col: Observable<Order[]>) {
    this.data$ = col;
  }

  // public update state item
  public changeState(item: Order, state: StateOrder): Observable<Order> {
    const obj = { ...item };
    obj.state = state;
    return this.update(new Order(obj));
  }

  // public update item in collection
  public update(item: Order): Observable<Order> {
    return this.http.put<Order>(`${this.urlApi}/orders/${item.id}`, item);
  }

  // public add item in collection

  // public delete item in collection

  // public get item by id from collection
}
