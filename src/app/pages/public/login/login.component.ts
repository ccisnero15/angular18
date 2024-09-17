import { Component, inject } from '@angular/core'
import { StateService } from '../../../shared/state/services/state.service'

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [],
    templateUrl: './login.component.html',
})
export class LoginComponent {
    stateService = inject(StateService)
    login() {
        this.stateService.login('santiago@elementoarg.io', '123')
    }
}
