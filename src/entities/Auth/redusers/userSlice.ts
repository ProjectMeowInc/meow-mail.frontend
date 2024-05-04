import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UserRoleType } from "../../User/types/UserRoleType"

interface IUser {
    id: number
    login: string
    role: UserRoleType
    contains_mailbox: boolean
    contains_two_factor: boolean
    mailbox: string
}

type SliceState = {
    data: null | IUser
}

const initialState: SliceState = {
    data: null,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<IUser>) {
            state.data = action.payload
        },

        resetUser() {
            return initialState
        },
    },
})

export const { setUser, resetUser } = userSlice.actions
