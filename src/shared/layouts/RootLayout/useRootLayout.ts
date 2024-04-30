import { ClientService } from "../../services/ClientService"
import { cleanUpStore, useAppSelector } from "../../../store"
import { useState } from "react"
import { RedirectService } from "../../services/RedirectService"
import { TokenService } from "../../services/TokenService"

export const useRootLayout = () => {
    const deviceType = ClientService.getClientType()
    const user = useAppSelector((state) => state.user.data)
    const [isActiveSendForm, setIsActiveSendForm] = useState<boolean>(false)

    const QuitHandler = () => {
        cleanUpStore()
        TokenService.removeAccessToken()
        TokenService.removeRefreshToken()
        RedirectService.redirect("/")
    }

    return {
        deviceType,
        user,
        isActiveSendForm,
        setIsActiveSendForm,
        QuitHandler,
    }
}
