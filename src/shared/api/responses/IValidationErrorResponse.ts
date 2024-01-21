export interface IValidationErrorResponse {
    error_type: string
    message: string
    errors: {
        field: string
        message: string
    }[]
}