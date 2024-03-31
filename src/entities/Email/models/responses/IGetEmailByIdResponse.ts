import { MailboxType } from "../type/MailboxType"

export interface IGetEmailByIdResponse {
    content: string
    date_time: 0
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
}
