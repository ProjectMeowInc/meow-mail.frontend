import { useEffect, useState } from "react"
import { useCreateEmailGroupMutation, useGetAllEmailGroupQuery } from "../../../entities/EmailGroup/api/EmailGroupApi"
import { AlertService } from "../../services/AlertService"
import { IOnChangeEvent } from "../../events/IOnChangeEvent"

interface IRequestDataProps {
    constrains?: {
        from?: string
        subject?: string
        to?: string
    }
    name?: string
}

export const useEmailGroup = () => {

    const [isOpen, setIsOpen] = useState(false)
    const {data: groups, error} = useGetAllEmailGroupQuery()
    const [createEmailGroup, {error: createEmailGroupError}] = useCreateEmailGroupMutation()
    const [requestData, setRequestData] = useState<IRequestDataProps>()

    useEffect(() => {
        if (error && "data" in error) {
            return AlertService.error(error.data.message)
        }
    }, [error])

    useEffect(() => {
        if (createEmailGroupError && "data" in createEmailGroupError) {
            return AlertService.error(createEmailGroupError.data.message)
        }
    }, [createEmailGroupError])

    const ChangeHandler = ({fieldValue, fieldName}: IOnChangeEvent) => {
        if (fieldName === "name") {
            setRequestData(prevState => ({
                ...prevState,
                name: fieldValue
            }))
        } else {
            setRequestData(prevState => ({
                ...prevState,
                constrains: {
                    ...prevState?.constrains,
                    [fieldName]: fieldValue
                }
            }))
        }
    }

    const SubmitHandler = async () => {

        if (!requestData || !requestData.name) {
            return AlertService.error("Вы не указали имя")
        }

        await createEmailGroup({
            name: requestData.name,
            constrains: requestData.constrains
        })
    }

    return {
        isOpen,
        setIsOpen,
        groups,
        ChangeHandler,
        SubmitHandler
    }
}