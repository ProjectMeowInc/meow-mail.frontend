import { useAppSelector } from "../../../../store"
import { useNavigate } from "react-router-dom"
import { AlertService } from "../../../services/AlertService"
import { useGetEmailStatisticQuery } from "../../../../entities/Email/api/emailApi"

export const useHeaderDesktop = () => {
    const {data} = useGetEmailStatisticQuery(undefined, {
        pollingInterval: 10000
    })
    const user = useAppSelector((state) => state.user.data)
    const navigate = useNavigate()

    const CopyHandler = () => {
        navigator.clipboard.writeText(user?.mailbox ?? "")
        AlertService.success("Почта скопирована")
    }

    return {
        user,
        navigate,
        CopyHandler,
        data
    }
}
