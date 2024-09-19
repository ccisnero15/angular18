import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core'
import { provideRouter, TitleStrategy, withComponentInputBinding, withRouterConfig, withViewTransitions } from '@angular/router'
import { NgxSpinnerModule } from 'ngx-spinner'

import routesConfig from './app.routes'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { authInterceptor } from './core/interceptors/auth.interceptor'
import { TemplatePageTitleStrategy } from './core/services/template-page-title-strategy.service'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { spinnerInterceptor } from './core/interceptors/spinner.interceptor'

export const appConfig: ApplicationConfig = {
    providers: [
        importProvidersFrom(
            BrowserModule,
            BrowserAnimationsModule,
            FormsModule,
            ReactiveFormsModule,
            NgxSpinnerModule.forRoot({ type: 'ball-clip-rotate' })
        ),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routesConfig, withRouterConfig({ paramsInheritanceStrategy: 'always' }), withComponentInputBinding(), withViewTransitions()),
        provideHttpClient(withInterceptors([authInterceptor, spinnerInterceptor])),
        { provide: TitleStrategy, useClass: TemplatePageTitleStrategy },
    ],
}
