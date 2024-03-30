import { useSearchParams } from "react-router-dom"
import { Option } from "ts-result-meow/dist/Option"

export const useSearchParamsWrapper = () => {
    const [searchParams] = useSearchParams()

    const setSearchParams = searchParams.set

    const getParamExcept = (paramName: string, except: string[]): Option<string> => {
        const val = searchParams.get(paramName)
        if (!val) {
            return Option.none()
        }

        if (except.includes(val)) {
            return Option.none()
        }

        return Option.some(val)
    }

    return {
        setSearchParams,
        getParamExcept,
    }
}
