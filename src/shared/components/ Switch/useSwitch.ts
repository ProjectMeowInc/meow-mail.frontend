import { useEffect, useState } from "react"

export const useSwitch = (isChecked?: boolean) => {
    const [isActive, setIsActive] = useState<boolean>(false)

    useEffect(() => {
        setIsActive(!!isChecked)
    }, [isChecked])

    return {
        isActive,
    }
}
