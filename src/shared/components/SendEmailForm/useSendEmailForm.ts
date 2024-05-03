import { useSendEmailMutation } from "../../../entities/Email/api/emailApi"
import { useEffect, useState } from "react"
import { SendEmailDto } from "../../../entities/Email/models/dto/SendEmailDto"
import { IOnChangeEvent } from "../../events/IOnChangeEvent"
import { AlertService } from "../../services/AlertService"
import { isCorrectError } from "../../utils/hasData"

export const useSendEmailForm = (closeForm: () => void) => {
    const [sendEmail, { error, isSuccess }] = useSendEmailMutation()
    const [requestData, setRequestData] = useState<SendEmailDto>()

    useEffect(() => {
        if (isCorrectError(error)) {
            return AlertService.error(error.data.message)
        }
    }, [error])

    useEffect(() => {
        if (isSuccess) {
            AlertService.success("Письмо было отправлено")
            closeForm.call(null)
        }
    }, [isSuccess])

    const ChangeHandler = ({ fieldValue, fieldName }: IOnChangeEvent) => {
        setRequestData((prevState) => ({
            ...prevState,
            [fieldName]: fieldValue,
        }))
    }

    const SubmitHandler = async (content: string) => {
        if (!requestData) {
            return
        }

        if (requestData.subject && requestData.to) {
            await sendEmail({
                to: requestData.to,
                subject: requestData.subject,
                content: content,
            })
        }
    }

    return {
        ChangeHandler,
        SubmitHandler,
    }
}
