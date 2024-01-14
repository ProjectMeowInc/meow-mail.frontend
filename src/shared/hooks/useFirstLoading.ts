import {useEffect} from "react";

export const useFirstLoadingAsync = (callback: () => Promise<any>) => {
    useEffect(() => {
        callback()
            .finally(() => {})
    }, []);
}