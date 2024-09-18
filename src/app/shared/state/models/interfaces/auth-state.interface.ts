export interface AuthStateModel {
    id: string
    token: string
    roles: Array<string>
    display: string
    refreshToken: string
    expirationDate: Date
    isAuthenticated: boolean
}
