import { useAppSelector } from "../../../../store"
import { useNavigate } from "react-router-dom"
import { AlertService } from "../../../services/AlertService"

export const useHeaderDesktop = () => {
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
    }
}
