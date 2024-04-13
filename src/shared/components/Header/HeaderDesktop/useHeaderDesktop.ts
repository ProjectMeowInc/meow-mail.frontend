import { useAppSelector } from "../../../../store"
import { useNavigate } from "react-router-dom"

export const useHeaderDesktop = () => {
    const user = useAppSelector((state) => state.user.data)
    const navigate = useNavigate()

    return {
        user,
        navigate,
    }
}
