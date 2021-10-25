import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  private currentUserSubject$: BehaviorSubject<User>;
  public currentUser$: Observable<User>;
  private authUrlApi = environment.authUrlApi;
  constructor(private http: HttpClient) { 
    this.currentUserSubject$ = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser$ = this.currentUserSubject$.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject$.value;
  }

  public login(username: string, password: string) {
    return this.http.post<any>(`${this.authUrlApi}users/authenticate`, {username, password}).pipe(
      map((user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject$.next(user);
        return user;
      })
    )
  }

  public logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject$.next(null!);
  }
}
