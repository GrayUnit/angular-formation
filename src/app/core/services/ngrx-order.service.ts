import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class NgrxOrderService {
  public orders$ = new BehaviorSubject<Order[]>([]);
  private urlApi = environment.urlApi;

  constructor(private http: HttpClient) { }

  public getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${environment.urlApi}/orders`).pipe(
      map((orders: Order[]) => {
        orders = orders.map(
          (o) => new Order(o)
        )
        return orders
      })
    );
  }

  public addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.urlApi}/orders`, order).pipe(
      map((order: Order) => new Order(order))
    );
  }

  public updateOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.urlApi}/orders/${order.id}`, order).pipe(
      map((order: Order) => new Order(order))
    );
  }

  public deleteOrder(id: number): Observable<number>{
    return this.http.delete<Order>(`${this.urlApi}/orders/${id}`).pipe(
      map(response => id)
    );
  }
}
