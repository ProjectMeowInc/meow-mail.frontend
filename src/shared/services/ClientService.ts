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

    /**
     * Метод позволяет узнать является ли устройство мобильным устройством
     */
    public static isMobileDevice(deviceType: DeviceType): boolean {
        return deviceType === "smartphone" || deviceType === "tablet"
    }

    /**
     * Метод позволяет узнать является ли устройство настольным компьютером
     */
    public static isDesktopDevice(deviceType: DeviceType): boolean {
        return deviceType === "desktop"
    }
}
