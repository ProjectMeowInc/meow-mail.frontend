import { useCreateEmailGroupMutation } from "../../../../../entities/EmailGroup/api/EmailGroupApi"
import { FocusEvent, FormEvent, useEffect, useState } from "react"
import { AlertService } from "../../../../services/AlertService"
import { IOnChangeEvent } from "../../../../events/IOnChangeEvent"
import { useAppSelector } from "../../../../../store"
import { hasDataInError } from "../../../../utils/hasData"

interface IRequestDataProps {
    constrains?: {
        from?: string[]
        subject?: string
        to?: string
    }
    name?: string
}

export const useCreateEmailGroupModal = (isActive: boolean, setModalIsOpen: (value: boolean) => void) => {
    const [createEmailGroup, { error: createEmailGroupError, isSuccess }] = useCreateEmailGroupMutation()
    const [requestData, setRequestData] = useState<IRequestDataProps>()
    const user = useAppSelector((state) => state.user.data)
    const [emails, setEmails] = useState<string[]>([])

    useEffect(() => {
        if (hasDataInError(createEmailGroupError)) {
            return AlertService.error(createEmailGroupError.data.message)
        }
    }, [createEmailGroupError])

    useEffect(() => {
        if (isSuccess) {
            setModalIsOpen(false)
            return AlertService.success(`Группа с именем ${requestData?.name} создана`)
        }
    }, [isSuccess])

    const ChangeHandler = ({ fieldValue, fieldName, input }: IOnChangeEvent) => {
        if (fieldName === "name") {
            setRequestData((prevState) => ({
                ...prevState,
                name: fieldValue,
            }))
        } else if (fieldName === "from" && fieldValue.includes(" ")) {
            if (input) {
                input.target.value = ""
            }

            const email = fieldValue.trim()

            if (!emails.includes(email)) {
                setEmails((prevState) => [...prevState, email])
            }
        } else {
            setRequestData((prevState) => ({
                ...prevState,
                constrains: {
                    ...prevState?.constrains,
                    [fieldName]: fieldValue,
                },
            }))
        }
    }

    const SubmitHandler = async (event: FormEvent) => {
        event.preventDefault()

        if (!requestData || !requestData.name) {
            return AlertService.error("Вы не указали имя")
        }

        await createEmailGroup({
            name: requestData.name,
            constrains: {
                ...requestData.constrains,
                from: emails,
                to: [user ? `${user.login}@projectmeow.ru` : ""],
            },
        })
    }

    const DeleteEmailHandler = (mailbox: string) => {
        setEmails(emails.filter((email) => email !== mailbox))
    }

    const BlurHandler = (event: FocusEvent<HTMLInputElement>) => {
        console.log(event.target.value)
        const email = event.target.value.trim()

        if (!emails.includes(email)) {
            setEmails((prevState) => [...prevState, email])
        }

        event.target.value = ""
    }

    return {
        SubmitHandler,
        ChangeHandler,
        emails,
        DeleteEmailHandler,
        BlurHandler,
    }
}
