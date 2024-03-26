import { useDeleteEmailByIdMutation, useUpdateEmailStatusMutation } from "../../../entities/Email/api/emailApi"
import { useEffect } from "react"
import { AlertService } from "../../services/AlertService"

export const useEmail = () => {
    const [updateEmailStatus, { error }] = useUpdateEmailStatusMutation()
    const [deleteEmailById, { error: deleteEmailByIdError }] = useDeleteEmailByIdMutation()

    useEffect(() => {
        if (error && "data" in error) {
            return AlertService.error(error.data.message)
        }
    }, [error])

    useEffect(() => {
        if (deleteEmailByIdError && "data" in deleteEmailByIdError) {
            return AlertService.error(deleteEmailByIdError.data.message)
        }
    }, [deleteEmailByIdError])

    const CheckHandler = async (mailId: number, readStatus: boolean) => {
        await updateEmailStatus({
            mail_id: mailId,
            is_read: !readStatus,
        })
    }

    const DeleteHandler = async (emailId: number) => {
        await deleteEmailById(emailId)
    }

    return {
        CheckHandler,
        DeleteHandler,
    }
}
