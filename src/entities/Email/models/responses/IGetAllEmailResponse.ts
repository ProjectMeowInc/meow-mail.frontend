import { MailboxType } from "../type/MailboxType"

export interface IGetAllEmailResponse {
    count: number
    items: {
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
    }[]
    page: number
}
