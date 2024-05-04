import { EmailEntity } from "../../entities/Email/EmailEntity"

export interface IGroupedEmails {
    date: string
    items: EmailEntity[]
}

interface IAcc {
    [key: string]: EmailEntity[]
}

/**
 * Сервис для форматирования
 */
export class FormatterService {
    /**
     * Метод для форматирования даты
     */
    public static formatDate(time: number): string {
        const formatter = new Intl.DateTimeFormat("ru", {
            day: "numeric",
            month: "long",
            year: "numeric",
        })
        return formatter.format(new Date(time))
    }

    /**
     * Метод для группировки почты по дате
     * @param emails письма пользователя
     */
    public static sortEmailsByDate(emails: EmailEntity[]): IGroupedEmails[] {
        const groups = emails.reduce((acc: IAcc, email) => {
            const date = this.formatDate(email.date_time * 1000)
            if (!acc[date]) {
                acc[date] = []
            }
            acc[date].push(email)
            return acc
        }, {})

        return Object.keys(groups)
            .map((date) => {
                return {
                    date,
                    items: groups[date].reverse(),
                }
            })
            .reverse()
    }
}
