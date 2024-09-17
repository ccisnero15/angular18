import { Route } from '@angular/router'
import { LoginComponent } from './pages/public/login/login.component'
import { HomeComponent } from './pages/private/home/home.component'
export default [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'home',
        component: HomeComponent,
    },
] satisfies Route[]
