import {AppError} from "../AppError";

export class Result<TContent> {
    private readonly value: TContent | null
    private readonly error: AppError | null

    constructor(value: TContent | null, error: AppError | null) {
        this.value = value
        this.error = error
    }

    unwrap(): TContent {
        if (!this.value) {
            throw new Error("Значение не может быть пустым")
        }

        return this.value
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

    static ok<TResult>(value: TResult): Result<TResult> {
        return new Result<TResult>(value, null)
    }

    static error<TResult>(error: AppError): Result<TResult> {
        return new Result<TResult>(null, error)
    }
}