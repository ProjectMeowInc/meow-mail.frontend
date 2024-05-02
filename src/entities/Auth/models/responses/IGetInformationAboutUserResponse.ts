export interface IGetInformationAboutUserResponse {
    user: {
        id: number
        login: string
        contains_mailbox: boolean
        contains_two_factor: boolean
    }
}
