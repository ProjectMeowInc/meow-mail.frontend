import { BASE_SITE_URL } from "../../consts"

/**
 * Сервис для редиректа пользователя
 */
export class RedirectService {

    /**
     * Метод для редиректа пользователя по конкретной ссылке
     * @param href - ссылка на конечную страницу
     */
    public static redirect(href = "") {
        window.location.href = BASE_SITE_URL + href
    }

    /**
     * Метод для возвращения на страницу назад
     */
    public static back() {
        window.history.back()
    }
}