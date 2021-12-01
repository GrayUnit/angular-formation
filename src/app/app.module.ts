import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { FakeBackendInterceptor } from './core/interceptors/fake-backend.interceptor';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { LoginModule } from './login/login.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CoreModule, AppRoutingModule, HttpClientModule, LoginModule],
  providers: [
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
