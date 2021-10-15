import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class NgrxOrderService {



  constructor(private http: HttpClient) { }

  public getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${environment.urlApi}/orders`).pipe(
      map((orders: Order[]) => {
        orders = orders.map((o) => new Order(o));
        return orders
      })
    );
  }

  public addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${environment.urlApi}/orders`, order);
  }

  public deleteOrder(id: number): Observable<number> {
    return this.http.delete<Order>(`${environment.urlApi}/orders/${id}`).pipe(
      map(response => id)
    );
  }

  public updateOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(`${environment.urlApi}/orders/${order.id}`, order);
  }
}
