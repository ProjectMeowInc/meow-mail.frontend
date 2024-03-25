export interface IGetEmailByIdResponse {
    content: string
    date_time: 0
    from: {
        id: number
        mailbox: string
    }
    id: number
    is_read: boolean
    subject: string
    to: {
        id: number
        mailbox: string
    }
}