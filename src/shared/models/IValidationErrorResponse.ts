export interface IValidationErrorResponse {
    data: {
        message: string
        error_type: string
        errors: {
            field: string
            message: string
        }[]
    }
    status: number
}
