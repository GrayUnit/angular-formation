import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule, TransferState } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { translateBrowserLoaderFactory } from './core/helpers/translate-loader';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { FakeBackendInterceptor } from './core/interceptors/fake-backend.interceptor';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { appEffects, rootReducers } from './core/store';
import { TransferHttpCacheModule } from '@nguniversal/common';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    CoreModule,
    AppRoutingModule,
    HttpClientModule,
    TransferHttpCacheModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateBrowserLoaderFactory,
        deps: [HttpClient, TransferState]
      },
      isolate: false
    }),
    StoreModule.forRoot(rootReducers),
    EffectsModule.forRoot(appEffects),
    StoreDevtoolsModule.instrument({
      name: '[CRM Store]',
      maxAge: 25
    })
  ],
  providers: [
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
