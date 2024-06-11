import { useState } from "react"
import { BASE_API_URL } from "../../../../../consts"
import { TokenService } from "../../../../../shared/services/TokenService"

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

    function downloadFile(url: string, fileName: string) {
        const a = document.createElement("a")
        a.href = url
        a.download = fileName
        a.style.display = "none"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }

    return {
        isOpen,
        setIsOpen,
        DownloadFileHandler,
    }
}
