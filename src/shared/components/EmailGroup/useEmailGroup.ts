import { useEffect, useState } from "react"
import { AlertService } from "../../services/AlertService"
import { useGetAllEmailGroupQuery } from "../../../entities/EmailGroup/api/EmailGroupApi"

export const useEmailGroup = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { data: groups, error } = useGetAllEmailGroupQuery()
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)

    useEffect(() => {
        if (error && "data" in error) {
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
