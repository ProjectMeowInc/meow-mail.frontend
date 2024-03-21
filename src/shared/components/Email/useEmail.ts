import { useUpdateEmailStatusMutation } from "../../../entities/Email/api/emailApi"
import { useEffect } from "react"
import { AlertService } from "../../services/AlertService"

export const useEmail = () => {

    const [updateEmailStatus, {error}] = useUpdateEmailStatusMutation()

    useEffect(() => {
        if (error && "data" in error) {
            return AlertService.error(error.data.message)
        }
    }, [error])

    const CheckHandler = async (mailId: number, readStatus: boolean) => {
        await updateEmailStatus({
            mail_id: mailId,
            is_read: !readStatus
        })
    }

    return {
        CheckHandler
    }
}