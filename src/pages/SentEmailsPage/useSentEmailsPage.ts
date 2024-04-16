import { useGetEmailWithFilterQuery } from "../../entities/Email/api/emailApi"
import { useEffect } from "react"
import { isCorrectError } from "../../shared/utils/hasData"
import { AlertService } from "../../shared/services/AlertService"

export const useSentEmailsPage = () => {
    const { data: emails, error } = useGetEmailWithFilterQuery({
        pageNumber: 1,
        is_received: false,
    })

    useEffect(() => {
        if (isCorrectError(error)) {
            return AlertService.error(error.data.message)
        }
    }, [error])

    return {
        emails,
    }
}
