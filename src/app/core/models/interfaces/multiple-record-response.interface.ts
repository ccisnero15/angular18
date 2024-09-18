export interface MultipleRecordsResponse<T> {
    count: number
    start: number
    length: number
    data: T[]
}
