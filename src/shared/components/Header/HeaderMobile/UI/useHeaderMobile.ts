import { useState } from "react"
import { useNavigate } from "react-router"

export const useHeaderMobile = () => {

    const [isActive, setIsActive] = useState<boolean>(false)
    const navigate = useNavigate()

    return {
        isActive,
        setIsActive,
        navigate
    }
}