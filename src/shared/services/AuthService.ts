import { TokenService } from "./TokenService"

interface IFastAuthData {
    tryDate: Date
}

const StorageKey = "___fast_auth"

export class AuthService {
    public static isTryFastAuth(): boolean {
        const accessToken = TokenService.getAccessToken()

        if (!accessToken || TokenService.isValidAccessToken(accessToken)) {
            return true
        }

        const item = sessionStorage.getItem(StorageKey)
        if (!item) {
            return false
        }

        const data: IFastAuthData = JSON.parse(item, (key, value) => {
            if (key === "tryDate") {
                return new Date(Date.parse(value))
            }
            return value
        })

        // dates as seconds
        const currentSec = new Date().getTime() / 1000
        const fastAuthSec = data.tryDate.getTime() / 1000

        const diff = currentSec - fastAuthSec
        const diffMinutes = diff / 60

        // if last trying fast auth was less 30 minutes ago
        return diffMinutes < 30
    }

    public static setTryFastAuth() {
        const data: IFastAuthData = {
            tryDate: new Date(),
        }
        sessionStorage.setItem(StorageKey, JSON.stringify(data))
    }
}
