import { useEffect } from "react"

export const useFirstLoadingAsync = (callback: () => Promise<void>) => {
    useEffect(() => {
        callback.call(null).then()
    }, [])
}