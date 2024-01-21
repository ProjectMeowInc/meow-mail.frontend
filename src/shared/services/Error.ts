export type Error = ApiError | NetworkError | AppError

type ApiError = {
    displayMessage?: string
    errorType: "ApiError"
    response: ApiErrorBaseType | ApiValidationErrorType
}

type ApiErrorBaseType = {
    apiErrorType: "BaseError"
    raw?: any
    message: string
}

type ApiValidationErrorType = {
    apiErrorType: "ValidationError"
    raw?: any
    errors: {
        field: string
        message: string
    }[]
    message: string
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