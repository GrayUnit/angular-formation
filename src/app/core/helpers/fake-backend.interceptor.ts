import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, dematerialize, materialize, mergeMap } from 'rxjs/operators';
import { User } from '../models/user';


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let users = JSON.parse(localStorage.getItem('users')!) || [];
    const { url, method, headers, body } = request;
    return of(null)
    .pipe(mergeMap(handleRoute))
    .pipe(materialize())
    .pipe(delay(500))
    .pipe(dematerialize());

    function handleRoute() {
      switch(true) {
        case url.endsWith('/users/authenticate') && method == 'POST':
          return authenticate();
        case url.endsWith('/users/register') && method == 'POST':
          return register();
        case url.endsWith('/users') && method == 'GET':
          return getUsers();
        case url.match(/\users\/d+$/) && method == 'DELETE':
          return deleteUser();
        default:
          return next.handle(request);
      }
    }

    function authenticate() {
      const { username, password } = body;
      const user = users.find((x: User) => x.username === username && x.password === password);
      if(!user) {
        return error('Username ou password incorrect.')
      }
      return ok({
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        token: 'fake-jwt-token'
      })
    }

    function register() {
      const user = body;
      if(users.find((x: User) => x.username == user.username)) {
        return error(`Username ${user.username} existe déjà`)
      }
      user.id = users.length ? Math.max(...users.map((x: User) => x.id)) + 1 : 1;
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
      return ok();
    }

    function getUsers() {
      if(!isLoggedIn()) {
        return unauthorized();
      }
      return ok(users);
    }

    function deleteUser() {
      if(!isLoggedIn()) {
        return unauthorized();
      }
      users = users.filter((x: User) => x.id !== idFromUrl());
      localStorage.setItem('users', JSON.stringify(users));
      return ok();
    }

    function ok(body?: any) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function error(message: string) {
      return throwError({ error: {message }});
    }

    function unauthorized() {
      return throwError({ status: 401, error: {message: 'Unauthorized'}});
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length -1]);
    }

    function isLoggedIn() {
      return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }

  }
}
export const fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
} 