export interface IGetEmailGroupsResponse {
    items: {
        id: number
        name: string
        constrains: {
            from: string
            subject: string
            to: string
        }
    }[]
}