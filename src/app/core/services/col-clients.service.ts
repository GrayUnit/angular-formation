import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ColErrorHandler } from '../abstracts/col-error-handler';
import { StateClient } from '../enums/state-client';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root',
})
export class ColClientsService extends ColErrorHandler {
  private data$ = new BehaviorSubject<Client[]>([]);
  private urlApi = environment.urlApi;
  constructor(private http: HttpClient) {
    super();
    this.refreshCollection();
  }

  private refreshCollection(): void {
    this.http
      .get<Client[]>(`${this.urlApi}/clients`)
      .pipe(
        map((tab) => {
          return tab.map((obj) => {
            return new Client(obj);
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
  get collection(): BehaviorSubject<Client[]> {
    return this.data$;
  }

  // public update state item
  public changeState(item: Client, state: StateClient): Observable<Client> {
    const obj = { ...item };
    obj.state = state;
    return this.update(new Client(obj));
  }

  // public update item in collection
  public update(item: Client): Observable<Client> {
    return this.http
      .put<Client>(`${this.urlApi}/clients/${item.id}`, item)
      .pipe(
        tap((tab) => this.refreshCollection()),
        catchError(this.handleError)
      );
  }

  // public add item in collection
  public add(item: Client): Observable<Client> {
    return this.http.post<Client>(`${this.urlApi}/clients`, item).pipe(
      tap((tab) => this.refreshCollection()),
      catchError(this.handleError)
    );
  }

  // public delete item in collection
  public delete(id: number): Observable<Client> {
    return this.http.delete<Client>(`${this.urlApi}/clients/${id}`).pipe(
      tap((tab) => this.refreshCollection()),
      catchError(this.handleError)
    );
  }

  // public get item by id from collection
  public getItemById(id: number): Observable<Client> {
    return this.http
      .get<Client>(`${this.urlApi}/clients/${id}`)
      .pipe(catchError(this.handleError));
  }
}
