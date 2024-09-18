import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { CryptoClass } from '../models/classes/crypto.class'

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    setStorage(key: string, data: any) {
        const result = CryptoClass.encrypt(JSON.stringify(data))
        localStorage.setItem(key, result.toString())
    }

    getStorage(key: string) {
        const data = localStorage.getItem(key)
        const storage = data ? JSON.parse(CryptoClass.decrypt(data)) : ''
        return storage
    }

    clearStorage(key?: string) {
        key ? localStorage.removeItem(key) : localStorage.clear()
    }

    setAsyncStore(key: string, data: any): Observable<any> {
        const result = CryptoClass.encrypt(JSON.stringify(data))
        localStorage.setItem(key, result.toString())
        return of(result)
    }
}
