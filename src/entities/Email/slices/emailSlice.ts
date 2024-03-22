import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface IInitialStateProps {
    id: number
    content: string
    date_time: number
    from: number
    is_read: boolean
    subject: string
    to: number
}

const initialState: IInitialStateProps[] = []

export const emailSlice = createSlice({
    name: "emailSlice",
    initialState,
    reducers: {
        setEmails(state, action: PayloadAction<IInitialStateProps[]>) {
            return [...action.payload.filter(mail => !state.includes(mail))]
        },

        resetEmails() {
            return initialState
        }
    }
})

export const {setEmails, resetEmails,} = emailSlice.actions