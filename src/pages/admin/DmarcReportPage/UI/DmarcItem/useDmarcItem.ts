import { useState } from "react"
import { BASE_API_URL } from "../../../../../consts"
import { TokenService } from "../../../../../shared/services/TokenService"
import { downloadFile } from "../../../../../shared/utils/downloadFile"

export const useDmarcItem = () => {
    const [isOpen, setIsOpen] = useState(false)

    const DownloadFileHandler = async (fileId: string) => {
        fetch(BASE_API_URL + `v1/admin/get-file/${fileId}`, {
            headers: {
                Authorization: TokenService.getAccessToken() ?? "",
            },
        })
            .then((response) => response.blob())
            .then((blob) => {
                const url = window.URL.createObjectURL(blob)
                downloadFile(url, `${new Date().toUTCString()}.${fileId.split(".").pop()}`)
                window.URL.revokeObjectURL(url)
            })
    }

    return {
        isOpen,
        setIsOpen,
        DownloadFileHandler,
    }
}
