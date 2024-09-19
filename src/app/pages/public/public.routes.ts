import { Route } from '@angular/router'
import { PublicComponent } from './public.component'
import { LoginComponent } from './login/login.component'

export default [
    {
        path: 'public',
        component: PublicComponent,
        children: [{ path: 'login', title: 'Login', component: LoginComponent }],
    },
] satisfies Route[]
