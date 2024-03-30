import { LOG_LEVEL } from "../../consts"

export type LogLevel = "DEBUG" | "INFO" | "ERROR"

export class LogService {
    public static log(msg: string, level: LogLevel): void {
        const pretty = this.getPrettyLogLevel(level)
        if (this.requireLog(level)) {
            console.log(`[${pretty}] - ${msg}`)
        }
    }

    private static requireLog(level: LogLevel): boolean {
        const currentLevel = this.getLogLevelValue(LOG_LEVEL)
        const testLevel = this.getLogLevelValue(level)
        return currentLevel > testLevel
    }

    private static getPrettyLogLevel(level: LogLevel): string {
        switch (level) {
            case "DEBUG":
                return "DEBUG"
            case "INFO":
                return "INFO"
            case "ERROR":
                return "ERROR"
        }
    }

    private static getLogLevelValue(level: LogLevel): number {
        switch (level) {
            case "DEBUG":
                return 3
            case "INFO":
                return 2
            case "ERROR":
                return 1
        }
    }
}
