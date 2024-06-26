import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router"
import { cleanUpStore, useAppSelector } from "../../../../store"
import { TokenService } from "../../../services/TokenService"

export const useHeaderMobile = () => {
    const [isActive, setIsActive] = useState<boolean>(false)
    const navigate = useNavigate()
    const menuRef = useRef<HTMLDivElement | null>(null)
    const user = useAppSelector((state) => state.user.data)

    useEffect(() => {
        if (isActive) {
            return
        }

        // Здесь логика закрытия меню по нажатию на любое пространство.
        // Вешается click на document. После завершения обработчик удаляется

        document.addEventListener("click", (e) => {
            if (!menuRef.current) {
                return
            }

            if (!menuRef.current?.contains(e.target as Node)) {
                setIsActive(false)
            }
        })

        return () => {
            document.removeEventListener("click", (e) => {
                if (!menuRef.current) {
                    return
                }

                if (!menuRef.current?.contains(e.target as Node)) {
                    setIsActive(false)
                }
            })
        }
    }, [isActive, setIsActive])

    const QuitHandler = () => {
        TokenService.removeRefreshToken()
        TokenService.removeAccessToken()
        cleanUpStore()
        navigate("/")
    }

    return {
        isActive,
        setIsActive,
        navigate,
        menuRef,
        user,
        QuitHandler,
    }
}
