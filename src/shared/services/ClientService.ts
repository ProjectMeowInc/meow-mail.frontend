import DeviceDetector from "device-detector-js"
import { DeviceType } from "device-detector-js/dist/typings/device"

/**
 * Сервис для работы с браузером
 */
export class ClientService {

    /**
     * Метод для получения типа девайса браузера
     */
    public static getClientType(): DeviceType {
        const deviceDetector = new DeviceDetector()
        return deviceDetector.parse(navigator.userAgent)?.device?.type ?? "desktop"
    }
}