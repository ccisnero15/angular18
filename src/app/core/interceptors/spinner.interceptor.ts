import { inject } from '@angular/core'
import { HttpInterceptorFn } from '@angular/common/http'
import { finalize } from 'rxjs'
import { NgxSpinnerService } from 'ngx-spinner'

export const spinnerInterceptor: HttpInterceptorFn = (request, next) => {
    const spinnerService = inject(NgxSpinnerService)
    spinnerService.show()
    return next(request).pipe(finalize(() => spinnerService.hide()))
}
