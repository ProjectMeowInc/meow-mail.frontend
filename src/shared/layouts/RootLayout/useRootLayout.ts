import { ClientService } from "../../services/ClientService"

export const useRootLayout = () => {
    const deviceType = ClientService.getClientType()

    return {
        deviceType
    }
}