import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { StateService } from '../../shared/state/services/state.service'

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
    const stateService = inject(StateService)
    const router = inject(Router)
    //Se puede guardar la url actual y guardarla en el localstorage. En el caso que vuelva a loguearse
    //se lo redirecciona a la url donde estaba

    if (stateService.auth$().isAuthenticated) return true
    router.navigate(['login'])
    return false
}
