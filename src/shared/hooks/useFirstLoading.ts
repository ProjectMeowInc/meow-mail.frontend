import { useEffect } from "react"

export const useFirstLoading = (callback: () => void) => {
    useEffect(() => {
        callback.call(null)
    }, [])
}
