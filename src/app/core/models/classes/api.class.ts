import { HttpClient, HttpHeaders } from '@angular/common/http'
import { DestroyRef, inject } from '@angular/core'
import { map, Observable } from 'rxjs'
import { MultipleRecordsResponse } from '../interfaces/multiple-record-response.interface'

export abstract class ApiClass<T> {
    private apiUrl = 'https://49ers-levis-stadium-api.staging.silentiumapps.com/api/'
    protected pathName: string = ''
    private headers = new HttpHeaders().set('Content-type', 'application/json').set('charset', 'utf8')
    protected httpClient = inject(HttpClient)
    protected destroyRef = inject(DestroyRef)

    getPaginatedList(start = '0', length = '0', query?: string): Observable<MultipleRecordsResponse<T>> {
        const url = `${this.apiUrl}${this.pathName}?start=${start}&length=${length}${query ? '&query=' + query : ''}`
        return this.httpClient.get<T>(url, { headers: this.headers }).pipe(
            map((response: any) => {
                const records: MultipleRecordsResponse<T> = {
                    count: response.count,
                    start: response.start,
                    length: response.length,
                    data: response.data,
                }
                return records
            })
        )
    }

    getById(id: number): Observable<T> {
        const url = `${this.apiUrl}${this.pathName}/${id}`
        return this.httpClient.get<T>(url, { headers: this.headers }).pipe(map((response: any) => response.data))
    }

    update(data: T): Observable<T> {
        const url = `${this.apiUrl}${this.pathName}`
        const body = JSON.stringify(data)
        return this.httpClient.put(url, body, { headers: this.headers }).pipe(map((response: any) => (response && response.data ? response.data : null)))
    }

    create(data: T): Observable<T> {
        const url = `${this.apiUrl}${this.pathName}`
        const body = JSON.stringify(data)
        return this.httpClient.post(url, body, { headers: this.headers }).pipe(map((response: any) => (response && response.data ? response.data : null)))
    }
}
