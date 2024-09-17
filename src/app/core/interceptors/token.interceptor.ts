import { inject } from '@angular/core'
import { HttpInterceptorFn } from '@angular/common/http'
import { StateService } from '../../shared/state/services/state.service'

export const tokenInterceptor: HttpInterceptorFn = (request, next) => {
    const stateService = inject(StateService)
    console.log('interceptor', stateService.auth$().token)
    request = request.clone({
        setHeaders: { Authorization: `Bearer ${stateService.auth$().token}` },
        setParams: { socketId: '' },
    })

    return next(request)
}
