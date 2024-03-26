# MeowMail

---

Корпоративная почта для [Айтион X](https://www.xn--80aqcrew.xn--p1ai/).

![DesignSample.png](.github%2FDesignSample.png)

![SecondDesignSample.png](.github%2FSecondDesignSample.png)

> Весь дизайн можно посмотреть [здесь](https://www.figma.com/file/bf9iZLqGJmPSIJkgIEqXGW/Untitled?type=design&node-id=0-1&mode=design&t=j1TWqlkY9yv560ZR-0).

---

## Как запустить?

### Требования перед началом

-   NodeJS >= v20.11.1
-   Rust >= 1.76.0

Может и работать на более старых версиях, но тестируется и разрабатывается на данных.

### Frontend

-   Склонировать репозиторий:

```bash
git clone https://github.com/ProjectMeowInc/meow-mail.frontend.git frontend && cd frontend
```

-   Установить зависимости:

```bash
npm i
```

-   Запустить в `dev` версии:

```bash
npm run start
```

### Backend

-   Установить SQLX:

```bash
cargo install sqlx-cli
```

-   Склонировать репозиторий:

```bash
git clone https://github.com/ProjectMeowInc/meow-mail.backend.git backend && cd backend
```

-   Применить миграции:

```bash
sqlx migrate run
```

-   Запустить проект в `dev` версии:

```bash
cargo r
```

-   Или в `release`:

```bash
cargo r -r
```
