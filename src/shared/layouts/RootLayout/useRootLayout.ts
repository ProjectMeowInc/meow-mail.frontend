import { ClientService } from "../../services/ClientService"
import { useAppSelector } from "../../../store"

export const useRootLayout = () => {
    const deviceType = ClientService.getClientType()
    const user = useAppSelector(state => state.user.data)

    return {
        deviceType,
        user
    }
}