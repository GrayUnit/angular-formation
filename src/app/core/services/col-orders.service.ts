import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ColErrorHandler } from '../abstracts/col-error-handler';
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

  // public update item in collection

  // public add item in collection

  // public delete item in collection

  // public get item by id from collection
}
