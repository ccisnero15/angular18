import * as crypto from 'crypto-js'

export class CryptoService {
    static encrypt(value: any): any {
        const result = crypto.AES.encrypt(value, 'Key')
        return result.toString()
    }
    static decrypt(value: any): any {
        const result = crypto.AES.decrypt(value, 'Key')
        return result.toString(crypto.enc.Utf8)
    }
}
