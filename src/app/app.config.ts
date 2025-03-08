import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { errorInterceptor } from './shared/interceptors/error/error.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { spinnerInterceptor } from './shared/interceptors/spinner/spinner.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [provideAnimations(),
    provideToastr(),provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptors([errorInterceptor,spinnerInterceptor])),importProvidersFrom( RouterModule,BrowserAnimationsModule,NgxSpinnerModule)
  ]
};
