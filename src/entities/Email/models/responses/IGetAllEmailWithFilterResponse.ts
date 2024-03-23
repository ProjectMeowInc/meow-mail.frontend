export interface IGetAllEmailWithFilterResponse {
    count: number
    items: {
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
    }[],

    query: {
        page: number
        subject: string
    }
}