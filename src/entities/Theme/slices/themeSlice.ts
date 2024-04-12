import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type ThemeInitialSliceState = {
    theme: "dark" | "light"
}

console.log(window.matchMedia("(prefers-color-scheme: dark)").matches)

const initialState: ThemeInitialSliceState = {
    theme: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
}

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme(state, action: PayloadAction<"dark" | "light">) {
            state.theme = action.payload
        },

        resetTheme() {
            return initialState
        },
    },
})

const { setTheme, resetTheme } = themeSlice.actions
