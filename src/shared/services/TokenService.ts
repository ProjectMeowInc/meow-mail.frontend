import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"

export interface ITokenData {
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
        this.removeAccessToken()
        return Cookies.get("access_token")
    }

    /**
     * Метод для получения токена обновления
     */
    public static getRefreshToken() {
        this.removeRefreshToken()
        return Cookies.get("refresh_token")
    }

    /**
     * Метод для проверки валидности токена доступа
     */
    public static isValidAccessToken(accessToken: string): boolean {
        const parsedAccessToken = this.parseAccessToken(accessToken)
        return parsedAccessToken.expired_at > new Date()
    }

    /**
     * Метод для удаления токена доступа
     */
    public static removeAccessToken() {
        return Cookies.remove("access_token")
    }

    /**
     * Метод для удаления токена обновления
     */
    public static removeRefreshToken() {
        return Cookies.remove("refresh_token")
    }
}
