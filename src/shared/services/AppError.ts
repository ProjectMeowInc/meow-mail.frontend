export type AppError = {
    displayMessage?: string
} | {
    errorType: "HTTPError"
    statusCode: number
    responseBody: any
} | {
    errorType: "AppError"
    displayMessage: string
}