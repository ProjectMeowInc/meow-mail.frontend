import { MailboxType } from "../../../Email/models/type/MailboxType"

export interface IGetEmailsByEmailGroupResponse {
    count: number
    page: number
    page_count: number
    items: {
        content: string
        date_time: number
        from: {
            id: number
            mailbox: string
            type: MailboxType
        }
        id: number
        is_read: boolean
        subject: string
        to: {
            id: number
            mailbox: string
            type: MailboxType
        }
    }[]
}
