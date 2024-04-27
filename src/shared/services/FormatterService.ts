/**
 * Сервис для форматирования строк
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
}
