import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  public getAll() {
    return this.http.get<User[]>(`${environment.authUrlApi}users`)
  }

  public register(user: User) {
    return this.http.post<User>(`${environment.authUrlApi}users/register`, user);
  }

  public delete(id: number) {
    return this.http.delete<User>(`${environment.authUrlApi}users/${id}`);
  }
}
