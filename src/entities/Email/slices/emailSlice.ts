import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { MailboxType } from "../models/type/MailboxType"
import { FormatterService } from "../../../shared/services/FormatterService"

interface IInitialState {
    date: string
    items: IEmail[]
}

interface IEmail {
    id: number
    content: string
    date_time: number
    from: {
        id: number
        mailbox: string
        type: MailboxType
    }
    is_read: boolean
    subject: string
    to: {
        id: number
        mailbox: string
        type: MailboxType
    }
}

interface IAcc {
    [key: string]: IEmail[]
}

const initialState: IInitialState[] = []

export const emailSlice = createSlice({
    name: "emailSlice",
    initialState,
    reducers: {
        setEmails(state, action: PayloadAction<IEmail[]>) {
            const groups = action.payload.reduce((acc: IAcc, email) => {
                const date = FormatterService.formatDate(email.date_time * 1000)
                if (!acc[date]) {
                    acc[date] = []
                }
                acc[date].push(email)
                return acc
            }, {})

            const groupArrays = Object.keys(groups).map((date) => {
                return {
                    date,
                    items: groups[date],
                }
            })

            return [...groupArrays]
        },

        resetEmails() {
            return initialState
        },
    },
})

export const { setEmails, resetEmails } = emailSlice.actions
