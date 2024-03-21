export interface IGetAllEmailWithFilterResponse {
    count: number
    items: {
        id: number
        content: string
        date_time: number
        from: number
        is_read: boolean
        subject: string
        to: number
    }[],

    query: {
        page: number
        subject: string
    }
}