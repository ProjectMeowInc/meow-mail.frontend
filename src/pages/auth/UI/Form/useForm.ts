import { FormEvent } from "react"

export const useForm = () => {

    const SubmitHandler = (e: FormEvent, isLoading: boolean, onSubmit?: (e: FormEvent) => Promise<void>) => {
        e.preventDefault()

        if (!isLoading) {
            onSubmit?.call(null, e)
        }
    }

    return {
        SubmitHandler
    }
}