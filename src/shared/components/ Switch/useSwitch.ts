import { useEffect, useState } from "react"

export const useSwitch = (isChecked?: boolean) => {
    const [isActive, setIsActive] = useState<boolean>(false)

    useEffect(() => {
        if (isChecked) {
            setIsActive(true)
        } else {
            setIsActive(false)
        }
    }, [isChecked])

    return {
        isActive,
    }
}
