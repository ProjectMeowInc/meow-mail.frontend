import { useEffect, useState } from "react"
import { AlertService } from "../../services/AlertService"
import { useGetAllEmailGroupQuery } from "../../../entities/EmailGroup/api/EmailGroupApi"
import { hasDataInError } from "../../utils/hasData"

export const useEmailGroup = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { data: groups, error } = useGetAllEmailGroupQuery()
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)

    useEffect(() => {
        if (hasDataInError(error)) {
            return AlertService.error(error.data.message)
        }
    }, [error])

    return {
        isOpen,
        setIsOpen,
        groups,
        setModalIsOpen,
        modalIsOpen,
    }
}
