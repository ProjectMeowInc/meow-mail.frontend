import { useAppSelector } from "../../../../store"
import { useNavigate } from "react-router-dom"
import { AlertService } from "../../../services/AlertService"
import { useGetEmailStatisticQuery } from "../../../../entities/Email/api/emailApi"
import { useRef } from "react"
import { DEFAULT_TITLE } from "../../../../consts"

export const useHeaderDesktop = () => {
    const { data, currentData } = useGetEmailStatisticQuery(undefined, {
        pollingInterval: 5000,
    })
    const user = useAppSelector((state) => state.user.data)
    const navigate = useNavigate()
    const intervalRef = useRef<number | null>(null)

    const CopyHandler = () => {
        navigator.clipboard.writeText(user?.mailbox ?? "")
        AlertService.success("Почта скопирована")
    }

    window.onblur = () => {
        intervalRef.current = setInterval(() => {
            const newTitle =
                currentData && currentData.received_unread_email_count > 0
                    ? `(${currentData.received_unread_email_count}) не прочитанных | ${DEFAULT_TITLE}`
                    : DEFAULT_TITLE

            document.title = document.title !== DEFAULT_TITLE ? DEFAULT_TITLE : newTitle
        }, 1500)
    }

    window.onfocus = () => {
        if (!intervalRef.current) {
            return
        }
        document.title = DEFAULT_TITLE
        clearInterval(intervalRef.current)
        intervalRef.current = null
    }

    return {
        user,
        navigate,
        CopyHandler,
        data,
    }
}
