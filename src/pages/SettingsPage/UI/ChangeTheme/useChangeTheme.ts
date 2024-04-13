import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../../store"
import { setTheme } from "../../../../entities/Theme/slices/themeSlice"

export const useChangeTheme = () => {
    const [isDarkMode, setDarkMode] = useState<boolean>(false)
    const theme = useAppSelector((state) => state.theme.theme)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (theme === "dark") {
            setDarkMode(true)
        } else {
            setDarkMode(false)
        }
    }, [theme])

    const ClickHandler = () => {
        if (isDarkMode) {
            dispatch(setTheme("light"))
            setDarkMode(false)
        } else {
            dispatch(setTheme("dark"))
            setDarkMode(true)
        }
    }

    return {
        isDarkMode,
        ClickHandler,
    }
}
