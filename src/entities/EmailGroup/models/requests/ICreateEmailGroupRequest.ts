export interface ICreateEmailGroupRequest {
    constrains?: {
        from?: string[]
        subject?: string
        to?: string[]
    }
    name: string
}
