import { useConnectTelegramMutation } from "../../../../entities/Auth/api/AuthApi"
import { useEffect } from "react"
import { isCorrectError } from "../../../../shared/utils/hasData"
import { AlertService } from "../../../../shared/services/AlertService"

export const useAddToFactor = () => {
    const [connectTelegram, { error, data }] = useConnectTelegramMutation()

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
    }
}
