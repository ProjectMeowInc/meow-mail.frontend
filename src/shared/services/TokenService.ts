import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"

interface ITokenData {
    id: number
    login: string
    expired_at: Date
}

/**
 * Сервис для работы с токенами
 */
export class TokenService {

    /**
     * Метод для парсинга токена доступа
     * @param token токен доступа
     */
    public static parseAccessToken(token: string): ITokenData {
        return jwtDecode<ITokenData>(token)
    }

    /**
     * Метод для установки токена доступа в куки
     * @param token токен доступа
     */
    public static setAccessToken(token: string) {
        Cookies.set("access_token", token)
    }

    /**
     * Метод для установки токена обновления в куки
     * @param token токен обновления
     */
    public static setRefreshToken(token: string) {
        Cookies.set("refresh_token", token)
    }

    /**
     * Метод для получения токена доступа
     */
    public static getAccessToken() {
        return Cookies.get("access_token")
    }

    /**
     * Метод для получения токена обновления
     */
    public static getRefreshToken() {
        return Cookies.get("refresh_token")
    }
}