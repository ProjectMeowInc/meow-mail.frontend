import { useConnectTelegramMutation } from "../../../../entities/Auth/api/AuthApi"
import { useEffect } from "react"
import { isCorrectError } from "../../../../shared/utils/hasData"
import { AlertService } from "../../../../shared/services/AlertService"
import { useAppSelector } from "../../../../store"

export const useAddTwoFactor = () => {
    const [connectTelegram, { error, data }] = useConnectTelegramMutation()
    const user = useAppSelector((state) => state.user.data)

    useEffect(() => {
        if (isCorrectError(error)) {
            return AlertService.error(error.data.message)
        }
    }, [error])

    const CopyHandler = async () => {
        await navigator.clipboard.writeText(`/connectaccount ${data?.code}` ?? "")
    }

    const ClickHandler = async () => {
        await connectTelegram()
    }

    return {
        CopyHandler,
        ClickHandler,
        code: data?.code,
        user,
    }
}
