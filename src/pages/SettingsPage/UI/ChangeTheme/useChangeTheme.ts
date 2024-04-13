import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../../store"
import { setTheme } from "../../../../entities/Theme/slices/themeSlice"

export const useChangeTheme = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
    const theme = useAppSelector((state) => state.theme.theme)
    const dispatch = useAppDispatch()

    useEffect(() => {
        setIsDarkMode(theme === "dark")
    }, [theme])

    const ClickHandler = () => {
        dispatch(setTheme(theme === "dark" ? "light" : "dark"))
    }

    return {
        isDarkMode,
        ClickHandler,
    }
}
