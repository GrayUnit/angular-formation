import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ColErrorHandler } from '../abstracts/col-error-handler';
import { StateClient } from '../enums/state-client';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ColClientsService extends ColErrorHandler{

  private data$ = new BehaviorSubject<Client[]>([]);
  private urlApi = environment.urlApi;

  constructor(private http: HttpClient) { 
    super();
    this.refreshCollection();
  }

  private refreshCollection(): void {
    this.http.get<Client[]>(`${this.urlApi}/clients`).pipe(
      map((items) => {
        return items.map(
          (obj) => {
            return new Client(obj);
          }
        )
      }),
      catchError(this.handleError)
    )
    .subscribe((datas) => {
      this.data$.next(datas);
    })
  }

  get collection(): Observable<Client[]> {
    return this.data$.asObservable();
  }

  public changeState(item: Client, state: StateClient): Observable<Client> {
    const obj = {...item};
    obj.state = state;
    return this.update(new Client(obj));
  }

  public update(item: Client): Observable<Client> {
    return this.http.put<Client>(`${this.urlApi}/clients/${item.id}`, item).pipe(
      tap(() => this.refreshCollection()),
      catchError(this.handleError)
    );
  }

  public add(item: Client): Observable<Client> {
    return this.http.post<Client>(`${this.urlApi}/clients`, item).pipe(
      tap(() => this.refreshCollection()),
      catchError(this.handleError)
    )
  }

  public delete(id: number): Observable<Client> {
    return this.http.delete<Client>(`${this.urlApi}/clients/${id}`).pipe(
      tap(() => this.refreshCollection()),
      catchError(this.handleError)
    )
  }

  public getItemById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.urlApi}/clients/${id}`).pipe(
      tap(() => this.refreshCollection()),
      catchError(this.handleError)
    )
  }

}
