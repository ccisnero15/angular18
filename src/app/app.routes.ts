import { Route } from '@angular/router'

export default [
    {
        path: '',
        loadChildren: () => import('./pages/public/public.routes'),
    },
    {
        path: '',
        loadChildren: () => import('./pages/private/private.routes'),
    },
    {
        path: '**',
        redirectTo: '',
    },
] satisfies Route[]
