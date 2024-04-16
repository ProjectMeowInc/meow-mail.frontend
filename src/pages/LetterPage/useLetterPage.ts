import {
    useDeleteEmailByIdMutation,
    useGetEmailByIdQuery,
    useUpdateEmailStatusMutation,
} from "../../entities/Email/api/emailApi"
import { useParams } from "react-router"
import { useEffect } from "react"
import { AlertService } from "../../shared/services/AlertService"
import { RedirectService } from "../../shared/services/RedirectService"
import { isCorrectError } from "../../shared/utils/hasData"

export const useLetterPage = () => {
    const params = useParams<{ mailId: string }>()
    const { data: mail } = useGetEmailByIdQuery(Number(params.mailId))
    const [updateEmailStatus, { error: updateEmailError }] = useUpdateEmailStatusMutation()
    const [deleteEmailById, { error: deleteEmailError }] = useDeleteEmailByIdMutation()

    useEffect(() => {
        updateEmailStatus({
            is_read: true,
            mail_id: Number(params.mailId),
        })
    }, [])

    useEffect(() => {
        if (isCorrectError(updateEmailError)) {
            return AlertService.error(updateEmailError.data.message)
        }
    }, [updateEmailError])

    useEffect(() => {
        if (isCorrectError(deleteEmailError)) {
            return AlertService.error(deleteEmailError.data.message)
        }
    }, [deleteEmailError])

    const DeleteHandler = async () => {
        await deleteEmailById(Number(params.mailId))
        RedirectService.back()
    }

    return {
        mail,
        DeleteHandler,
    }
}
