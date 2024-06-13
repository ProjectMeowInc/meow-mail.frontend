import {
    useDeleteEmailByIdMutation,
    useGetEmailAttachmentsQuery,
    useGetEmailByIdQuery,
    useUpdateEmailStatusMutation,
} from "../../entities/Email/api/emailApi"
import { useParams } from "react-router"
import { useEffect, useState } from "react"
import { AlertService } from "../../shared/services/AlertService"
import { RedirectService } from "../../shared/services/RedirectService"
import { isCorrectError } from "../../shared/utils/hasData"
import { useFirstLoadingAsync } from "../../shared/hooks/useFirstLoadingAsync"
import { Filename } from "../../shared/services/Filename"
import { BASE_API_URL } from "../../consts"
import { downloadFile } from "../../shared/utils/downloadFile"

interface IFile {
    download_key: string
    name: string
    ext: string | null
}

export const useLetterPage = () => {
    const params = useParams<{ mailId: string }>()
    const { data: mail } = useGetEmailByIdQuery(Number(params.mailId))
    const [updateEmailStatus, { error: updateEmailError }] = useUpdateEmailStatusMutation()
    const [deleteEmailById, { error: deleteEmailError }] = useDeleteEmailByIdMutation()

    const { data: attachments } = useGetEmailAttachmentsQuery(Number(params.mailId))
    const [images, setImages] = useState<IFile[]>([])
    const [files, setFiles] = useState<IFile[]>([])

    useFirstLoadingAsync(async () => {
        await updateEmailStatus({
            is_read: true,
            mail_id: Number(params.mailId),
        })
    })

    useEffect(() => {
        if (!attachments) {
            return
        }

        attachments.items.map((attachment) => {
            const fileName = new Filename(attachment.name)

            if (fileName.isImageExtension()) {
                setImages((prevState) => [
                    ...prevState.filter((item) => item.name !== attachment.name),
                    {
                        name: attachment.name,
                        download_key: attachment.download_key,
                        ext: fileName.getExtension(),
                    },
                ])
            } else {
                setFiles((prevState) => [
                    ...prevState.filter((item) => item.name !== attachment.name),
                    {
                        name: attachment.name,
                        download_key: attachment.download_key,
                        ext: fileName.getExtension(),
                    },
                ])
            }
        })
    }, [attachments])

    useEffect(() => {
        if (isCorrectError(updateEmailError)) {
            return AlertService.error(updateEmailError.data.message)
        }
    }, [updateEmailError])

    useEffect(() => {
        if (isCorrectError(deleteEmailError)) {
            return AlertService.error(deleteEmailError.data.message)
        }
    }, [deleteEmailError])

    const DeleteHandler = async () => {
        await deleteEmailById(Number(params.mailId))
        RedirectService.back()
    }

    const DownloadHandler = async (downloadKey: string, name: string) => {
        const result = await fetch(BASE_API_URL + `v1/email/download/${downloadKey}`)
        const blob = await result.blob()
        const url = window.URL.createObjectURL(blob)
        downloadFile(url, name)
        window.URL.revokeObjectURL(url)
    }

    return {
        mail,
        DeleteHandler,
        images,
        files,
        DownloadHandler,
    }
}
