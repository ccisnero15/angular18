import { HttpClient, HttpHeaders } from '@angular/common/http'
import { computed, effect, inject, Injectable, signal } from '@angular/core'
import { Router } from '@angular/router'
import { map, Observable, of, switchMap } from 'rxjs'
import { LocalStorageService } from '../../../core/services/local-storage.service'
import { UserStateModel } from '../models/interfaces/user-state.interface'
import { AuthStateModel } from '../models/interfaces/auth-state.interface'

@Injectable({
    providedIn: 'root',
})
export class StateService {
    private httpClient = inject(HttpClient)
    private router = inject(Router)
    private localStorageService = inject(LocalStorageService)

    constructor() {}

    private state = {
        $user: signal<UserStateModel>(
            this.localStorageService.getStorage('user') || {
                userId: null,
                firstName: null,
                lastName: null,
                email: null,
            }
        ),
        $auth: signal<AuthStateModel>(
            this.localStorageService.getStorage('auth') || {
                isAuthenticated: false,
                token: '',
                refreshToken: '',
                expirationDate: new Date(),
                id: '',
                display: '',
                roles: [],
            }
        ),
        $loading: signal<boolean>(false),
    }
    //Selectores
    user$ = computed(() => this.state.$user())
    auth$ = computed(() => this.state.$auth())
    loading = computed(() => this.state.$loading())

    //effects
    effecAuthtState = effect(() => this.localStorageService.setStorage('auth', this.state.$auth()))
    effectUserState = effect(() => this.localStorageService.setStorage('user', this.state.$user()))

    //actions
    login(email: string, password: string) {
        const authUrl = 'https://49ers-levis-stadium-api.staging.silentiumapps.com/api/auth'
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('charset', 'utf8')
        const body = JSON.stringify({ email, password })
        this.httpClient
            .post(authUrl, body, { headers })
            .pipe(
                switchMap((response: any) => {
                    if (response && response.token) {
                        const payload = {
                            isAuthenticated: true,
                            token: response.token,
                            refreshToken: response.refreshToken,
                            expirationDate: new Date(response.expirationDate),
                            id: response.id,
                            display: response.display,
                            roles: response.roles.map((role: any) => role.trim()),
                        }

                        this.setAuth(payload)
                        this.router.navigate(['home'])
                        return this.getCurrentUser()
                    }
                    return of({})
                })
            )
            .subscribe((response) => {
                if (response.data) {
                    const payload = {
                        userId: response.data.userId,
                        email: response.data.email,
                        lastName: response.data.lastName,
                        firstName: response.data.firstName,
                    }
                    this.setUser(payload)
                }
            })
    }

    getCurrentUser(): Observable<any> {
        const apiUrl = 'https://49ers-levis-stadium-api.staging.silentiumapps.com/api/'
        const url = apiUrl + 'users/current'
        return this.httpClient.get(url, { responseType: 'json' })
    }

    //Reducers
    setUser(payload: UserStateModel) {
        this.state.$user.set(payload)
    }

    setAuth(payload: AuthStateModel) {
        this.state.$auth.set(payload)
    }

    refreshToken(): Observable<AuthStateModel> {
        const authUrl = 'https://49ers-levis-stadium-api.staging.silentiumapps.com/api/auth'
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('charset', 'utf8')

        const body = JSON.stringify({
            id: this.auth$().id,
            token: this.auth$().token,
            refreshToken: this.auth$().refreshToken,
            expirationDate: this.auth$().expirationDate,
            display: this.auth$().display,
        })
        return this.httpClient.post(`${authUrl}/refresh`, body, { headers }).pipe(
            map((response: any) => {
                const data = {
                    isAuthenticated: true,
                    token: response.token,
                    refreshToken: response.refreshToken,
                    expirationDate: new Date(response.expirationDate),
                    id: this.auth$().id,
                    display: this.auth$().display,
                    roles: this.auth$().roles,
                }

                return data
            })
        )
    }

    logout() {
        this.state.$auth.set({
            isAuthenticated: false,
            token: '',
            refreshToken: '',
            expirationDate: new Date(),
            id: '',
            display: '',
            roles: [],
        })

        this.state.$user.set({
            userId: null,
            firstName: null,
            lastName: null,
            email: null,
        })

        this.localStorageService.clearStorage()
        this.router.navigate(['login'])
    }
}
