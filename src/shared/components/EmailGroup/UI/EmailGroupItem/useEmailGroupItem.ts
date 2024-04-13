import { useDeleteEmailGroupByIdMutation } from "../../../../../entities/EmailGroup/api/EmailGroupApi"
import { useEffect } from "react"
import { AlertService } from "../../../../services/AlertService"
import { hasDataInError } from "../../../../utils/hasData"

export const useEmailGroupItem = () => {
    const [deleteEmailGroupById, { error: deleteEmailGroupError }] = useDeleteEmailGroupByIdMutation()

    useEffect(() => {
        if (hasDataInError(deleteEmailGroupError)) {
            return AlertService.error(deleteEmailGroupError.data.message)
        }
    }, [deleteEmailGroupError])

    const DeleteHandler = async (emailGroupId: number) => {
        await deleteEmailGroupById(emailGroupId)
    }

    return {
        DeleteHandler,
    }
}
