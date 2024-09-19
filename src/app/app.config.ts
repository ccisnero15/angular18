import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router'

import routesConfig from './app.routes'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { authInterceptor } from './core/interceptors/auth.interceptor'

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routesConfig, withRouterConfig({ paramsInheritanceStrategy: 'always' }), withComponentInputBinding()),
        provideHttpClient(withInterceptors([authInterceptor])),
    ],
}
