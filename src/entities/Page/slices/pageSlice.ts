import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface IInitialState {
    prevCount: number
    currentCount: number
}

const initialState: IInitialState = {
    prevCount: 1,
    currentCount: 20,
}

export const pageSlice = createSlice({
    name: "pageSlice",
    initialState,
    reducers: {
        nextPage: (state, action: PayloadAction<IInitialState>) => {
            state.prevCount = state.prevCount + action.payload.prevCount
            state.currentCount = state.currentCount + action.payload.currentCount
        },

        prevPage: (state, action: PayloadAction<IInitialState>) => {
            state.prevCount = state.prevCount - action.payload.prevCount
            state.currentCount = state.currentCount - action.payload.currentCount
        },
    },
})

export const { nextPage, prevPage } = pageSlice.actions
