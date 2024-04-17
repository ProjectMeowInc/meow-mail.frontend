import { jwtDecode } from "jwt-decode"
import { UserRoleType } from "../../entities/User/types/UserRoleType"

export interface ITokenData {
    id: number
    login: string
    role: UserRoleType
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
        localStorage.setItem("access_token", token)
    }

    /**
     * Метод для установки токена обновления в куки
     * @param token токен обновления
     */
    public static setRefreshToken(token: string) {
        localStorage.setItem("refresh_token", token)
    }

    /**
     * Метод для получения токена доступа
     */
    public static getAccessToken() {
        return localStorage.getItem("access_token")
    }

    /**
     * Метод для получения токена обновления
     */
    public static getRefreshToken() {
        return localStorage.getItem("refresh_token")
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
        localStorage.removeItem("access_token")
    }

    /**
     * Метод для удаления токена обновления
     */
    public static removeRefreshToken() {
        localStorage.removeItem("refresh_token")
    }
}
