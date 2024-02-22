import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"

interface ITokenData {
    id: number
    login: string
    expired_at: Date
}

export class TokenService {

    public static parseAccessToken(token: string): ITokenData {
        return jwtDecode<ITokenData>(token)
    }

    public static setAccessToken(token: string) {
        Cookies.set("access_token", token)
    }

    public static setRefreshToken(token: string) {
        Cookies.set("refresh_token", token)
    }

    public static getAccessToken() {
        return Cookies.get("access_token")
    }

    public static getRefreshToken() {
        return Cookies.get("refresh_token")
    }
}