export interface IBaseErrorResponse {
    data: {
        error_type: string
        message: string
    }
    status: number
}
