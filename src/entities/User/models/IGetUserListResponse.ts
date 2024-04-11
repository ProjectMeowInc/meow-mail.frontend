import { UserRoleType } from "../types/UserRoleType"

export interface IGetUserListResponse {
    count: number
    items: {
        id: number
        login: string
        role: UserRoleType
    }[]
    pages: number
}
