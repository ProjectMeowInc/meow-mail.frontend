import { useSendEmailMutation } from "../../../entities/Email/api/emailApi"
import { FormEvent, useEffect, useState } from "react"
import { SendEmailDto } from "../../../entities/Email/models/dto/SendEmailDto"
import { IOnChangeEvent } from "../../events/IOnChangeEvent"
import { AlertService } from "../../services/AlertService"
import { isCorrectError } from "../../utils/hasData"
import { EditorState } from "draft-js"
import { convertToHTML } from "draft-convert"

export const useSendEmailForm = (closeForm: () => void) => {
    const [sendEmail, { error, isSuccess }] = useSendEmailMutation()
    const [requestData, setRequestData] = useState<SendEmailDto>()

    const [content, setContent] = useState<EditorState>(EditorState.createEmpty())
    const [convertedContent, setConvertedContent] = useState<string>("")

    useEffect(() => {
        const html = convertToHTML(content.getCurrentContent())
        setConvertedContent(html)
    }, [content])

    useEffect(() => {
        if (isCorrectError(error)) {
            return AlertService.error(error.data.message)
        }
    }, [error])

    useEffect(() => {
        if (isSuccess) {
            closeForm.call(null)
        }
    }, [isSuccess])

    const ChangeHandler = ({ fieldValue, fieldName }: IOnChangeEvent) => {
        setRequestData((prevState) => ({
            ...prevState,
            [fieldName]: fieldValue,
        }))
    }

    const SubmitHandler = async (e: FormEvent) => {
        e.preventDefault()

        if (!requestData) {
            return
        }

        if (requestData.subject && requestData.to && requestData.content) {
            await sendEmail({
                to: requestData.to,
                subject: requestData.subject,
                content: convertedContent,
            })
        }
    }

    return {
        ChangeHandler,
        SubmitHandler,
        setContent,
        content,
    }
}
