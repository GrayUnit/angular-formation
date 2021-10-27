import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtools, StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FakeBackendInterceptor, fakeBackendProvider } from './core/helpers/fake-backend.interceptor';
import { createTranslateLoader } from './core/helpers/translate-loader';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { appEffects, rootReducers } from './core/store';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    StoreModule.forRoot(rootReducers),
    EffectsModule.forRoot(appEffects),
    StoreDevtoolsModule.instrument({
      name: '[CRM store]',
      maxAge: 10
    })
  ],
  providers: [
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    fakeBackendProvider
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
