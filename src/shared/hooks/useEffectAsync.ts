import { DependencyList, useEffect } from "react"

export const useEffectAsync = (callback: () => Promise<void>, deps: DependencyList) => {
    useEffect(() => {
        callback().then()
    }, deps)
}
