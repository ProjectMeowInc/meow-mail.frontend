import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface IInitialState {
    id: number
    content: string
    date_time: number
    from: {
        id: number
        mailbox: string
    }
    is_read: boolean
    subject: string
    to: {
        id: number
        mailbox: string
    }
}

const initialState: IInitialState[] = []

export const emailSlice = createSlice({
    name: "emailSlice",
    initialState,
    reducers: {
        setEmails(state, action: PayloadAction<IInitialState[]>) {
            return [...action.payload.filter((mail) => !state.includes(mail))]
        },

        resetEmails() {
            return initialState
        },
    },
})

export const { setEmails, resetEmails } = emailSlice.actions
