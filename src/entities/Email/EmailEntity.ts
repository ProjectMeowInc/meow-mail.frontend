import { MailboxType } from "./models/type/MailboxType"

export interface EmailEntity {
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
