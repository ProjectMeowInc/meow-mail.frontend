import React from "react"
import classes from "./notFoundPage.module.css"

const NotFoundPage = () => {
    return (
        <div className={classes.wrapper}>
            <h1 className={classes.code}>404</h1>
            <p className={classes.text}>Страница не найдена</p>
        </div>
    )
}

export default NotFoundPage
