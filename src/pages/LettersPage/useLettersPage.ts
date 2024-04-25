import { useAppSelector } from "../../store"

export const useLettersPage = () => {
    const storeMails = useAppSelector((state) => state.emailSlice)

    return {
        storeMails,
    }
}
