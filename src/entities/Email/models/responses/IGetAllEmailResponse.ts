export interface IGetAllEmailResponse {
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
    page: number
}