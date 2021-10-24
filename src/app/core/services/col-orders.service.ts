import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ColErrorHandler } from '../abstracts/col-error-handler';
import { StateOrder } from '../enums/state-order';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class ColOrdersService extends ColErrorHandler {
  private data$ = new BehaviorSubject<Order[]>([]);
  private urlApi = environment.urlApi;
  constructor(private http: HttpClient) {
    super();
    this.refreshCollection();
  }

  private refreshCollection(): void {
    this.http
      .get<Order[]>(`${this.urlApi}/orders`)
      .pipe(
        map((tab) => {
          return tab.map((obj) => {
            return new Order(obj);
          });
        }),
        catchError(this.handleError)
      )
      .subscribe((datas) => {
        this.data$.next(datas);
      });
  }
  /**
   * getter for my collection
   */
  get collection(): Subject<Order[]> {
    return this.data$;
  }

  // public set collection
  // set collection(col: Observable<Order[]>) {
  //   this.data$ = col;
  // }

  // public update state item
  public changeState(item: Order, state: StateOrder): Observable<Order> {
    const obj = { ...item };
    obj.state = state;
    return this.update(new Order(obj));
  }

  // public update item in collection
  public update(item: Order): Observable<Order> {
    return this.http.put<Order>(`${this.urlApi}/orders/${item.id}`, item).pipe(
      tap((tab) => this.refreshCollection()),
      catchError(this.handleError)
    );
  }

  // public add item in collection
  public add(item: Order): Observable<Order> {
    return this.http.post<Order>(`${this.urlApi}/orders`, item).pipe(
      tap((tab) => this.refreshCollection()),
      catchError(this.handleError)
    );
  }

  // public delete item in collection
  public delete(id: number): Observable<Order> {
    return this.http.delete<Order>(`${this.urlApi}/orders/${id}`).pipe(
      tap((tab) => this.refreshCollection()),
      catchError(this.handleError)
    );
  }

  // public get item by id from collection
  public getItemById(id: number): Observable<Order> {
    return this.http
      .get<Order>(`${this.urlApi}/orders/${id}`)
      .pipe(catchError(this.handleError));
  }
}
