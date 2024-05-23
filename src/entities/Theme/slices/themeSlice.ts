import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type ThemeInitialSliceState = {
    theme: "dark" | "light"
}

const initialState: ThemeInitialSliceState = {
    theme: "light",
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

export const { setTheme, resetTheme } = themeSlice.actions
