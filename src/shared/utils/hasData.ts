import { IValidationErrorResponse } from "../models/IValidationErrorResponse"
import { IBaseErrorResponse } from "../models/IBaseErrorResponse"
import { SerializedError } from "@reduxjs/toolkit"

export const isCorrectError = (
    error?: IValidationErrorResponse | IBaseErrorResponse | SerializedError,
): error is IValidationErrorResponse | IBaseErrorResponse => {
    return !!(error && "data" in error)
}
