export interface IGetInformationAboutUserResponse {
    mailbox: {
        id: number
        address: string
    }
    user: {
        id: number
        login: string
        contains_mailbox: boolean
        contains_two_factor: boolean
    }
}
