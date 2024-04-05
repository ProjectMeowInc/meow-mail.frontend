import { useEffect, useState } from "react"
import { useGetAllEmailGroupQuery } from "../../../entities/EmailGroup/api/EmailGroupApi"
import { AlertService } from "../../services/AlertService"

export const useEmailGroup = () => {

    const [isOpen, setIsOpen] = useState(false)
    const {data: groups, error} = useGetAllEmailGroupQuery()

    useEffect(() => {
        if (error && "data" in error) {
            return AlertService.error(error.data.message)
        }
    }, [error])

    return {
        isOpen,
        setIsOpen,
        groups
    }
}