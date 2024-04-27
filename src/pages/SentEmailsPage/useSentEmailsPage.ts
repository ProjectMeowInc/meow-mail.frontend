import { useAppSelector } from "../../store"

export const useSentEmailsPage = () => {
    const emails = useAppSelector((state) => state.emailSlice)

    return {
        emails,
    }
}
