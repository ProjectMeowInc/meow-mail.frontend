import { LogLevel } from "./shared/services/LogService"

export const BASE_API_URL = "https://projectmeow.ru/api/"
export const LOG_LEVEL: LogLevel = "INFO"
export const EMAIL_COLORS: string[] = ["5E2BFF", "C04CFD", "FC6DAB", "C7EAE4", "A7E8BD"]
export const DEFAULT_TITLE = "MeowMail"

export const EmailType = "email" as const
export const EmailGroup = "email-groups" as const
export const UserType = "type" as const
