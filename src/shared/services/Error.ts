export type Error = ApiError | NetworkError | AppError

type ApiError = {
    displayMessage?: string
    errorType: "ApiError"
    response: {
        raw?: any
        apiErrorType: string
    } & ApiErrorBaseType | ApiValidationErrorType
}

type ApiErrorBaseType = {
    errorType: "BaseError"
    message: string
}

type ApiValidationErrorType = {
    errorType: "ValidationError"
    errors: {
        field: string
        message: string
    }[]
}

type NetworkError = {
    displayMessage?: string
    errorType: "NetworkError"
    statusCode?: number
    responseBody?: any
}

type AppError = {
    displayMessage?: string
    errorType: "AppError"
}