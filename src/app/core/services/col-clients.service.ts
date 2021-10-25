import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StateClient } from '../enums/state-client';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ColClientsService {

  private data$ = new BehaviorSubject<Client[]>([]);
  private urlApi = environment.urlApi;

  constructor(private http: HttpClient) {
    this.refreshCollection();
  }

  get collection(): Observable<Client[]> {
    return this.data$.asObservable();
  }

  private refreshCollection(): void {
    this.http.get<Client[]>(`${this.urlApi}/clients`).pipe(
      map((col) => {
        return col.map((obj) => {
          return new Client(obj);
        })
      })
    ).subscribe((datas) => {
      this.data$.next(datas);
    })
  }

  public changeState(item: Client, state: StateClient) {
    const obj = {...item};
    obj.state = state;
    return this.update(new Client(obj));
  }

  public update(item: Client): Observable<Client> {
    return this.http.put<Client>(`${this.urlApi}/clients/${item.id}`, item).pipe(
      tap((tab) => this.refreshCollection())
    )
  }

  public add(item: Client): Observable<Client> {
    return this.http.post<Client>(`${this.urlApi}/clients`, item).pipe(
      tap((tab) => this.refreshCollection())
    )
  }

  public delete(id: number): Observable<Client> {
    return this.http.delete<Client>(`${this.urlApi}/clients/${id}`).pipe(
      tap(() => this.refreshCollection())
    )
  }

  public getItemById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.urlApi}/clients/${id}`)
  }

}
