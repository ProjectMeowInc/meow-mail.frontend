import {LOG_LEVEL} from "../../consts/VARS";

export class LogService {
    static info(message: string, from: string) {
        console.log(`Сообщение действия: ${message}. Место действия ${from}`)
    }

    static warning(message: string, from: string) {
        if (LOG_LEVEL !== "info") {
            console.log(`Сообщение предупреждения: ${message}. Место предупреждения ${from}`)
        }
    }

    static error(message: string, from: string) {
        if (LOG_LEVEL === "error") {
            console.log(`Сообщение ошибки: ${message}. Место ошибки ${from}`)
        }
    }
}