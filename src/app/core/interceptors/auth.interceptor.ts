import { inject } from '@angular/core'
import { HttpInterceptorFn } from '@angular/common/http'
import { StateService } from '../../shared/state/services/state.service'
import { catchError, switchMap, throwError } from 'rxjs'

export const authInterceptor: HttpInterceptorFn = (request, next) => {
    const stateService = inject(StateService)

    const authRequest = request.clone({
        setHeaders: { Authorization: `Bearer ${stateService.auth$().token}` },
        setParams: { socketId: '' },
    })

    return next(authRequest).pipe(
        catchError((error) => {
            if (error.status === 401) {
                return stateService.refreshToken().pipe(
                    switchMap((response) => {
                        stateService.setAuth(response)
                        const newAuthRequest = request.clone({
                            setHeaders: { Authorization: `Bearer ${response.token}` },
                            setParams: { socketId: '' },
                        })
                        return next(newAuthRequest)
                    }),
                    catchError((refreshError: ErrorEvent) => {
                        const error = new Error(refreshError.error)
                        stateService.logout()
                        return throwError(() => error)
                    })
                )
            }
            console.log('error', error)
            return throwError(() => error)
        })
    )
}
