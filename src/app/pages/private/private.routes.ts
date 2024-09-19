import { Route } from '@angular/router'
import { PrivateComponent } from './private.component'
import { HomeComponent } from './home/home.component'
import { isAuthenticatedGuard } from '../../core/guards/is-authenticated.guard'

export default [
    {
        path: 'private',
        component: PrivateComponent,
        children: [{ path: 'home', title: 'Home', component: HomeComponent, canActivate: [isAuthenticatedGuard] }],
    },
] satisfies Route[]
