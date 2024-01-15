import {AppError} from "../AppError";

export class EmptyResult {
    private readonly error: AppError | null

    constructor(error: AppError | null) {
        this.error = error
    }

    hasError(): boolean {
        return this.error !== null
    }

    getError(): AppError {
        if (!this.error) {
            throw new Error("Ошибка не может быть пуста")
        }

        return this.error
    }

    static ok(): EmptyResult {
        return new EmptyResult(null)
    }

    static error(error: AppError): EmptyResult{
        return new EmptyResult(error)
    }
}