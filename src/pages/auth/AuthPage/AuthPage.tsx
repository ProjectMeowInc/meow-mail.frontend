import React from "react"
import Form from "../UI/Form/Form"
import classes from "./authPage.module.css"
import { Link } from "react-router-dom"

const AuthPage = () => {
    return (
        <div className={classes.wrapper}>
            <h1 className={classes.logo}>MeowMail</h1>
            <div className={classes.modal}>
                <p className={classes.caption}>Вход через логин и пароль</p>
                <Form />

                <div className={classes.links}>
                    <div className={classes.modal_item}>
                        <p>Вы забыли пароль?</p>
                        <Link className={classes.link} to={""}>Восстановить</Link>
                    </div>
                    <div className={classes.modal_item}>
                        <p>Ещё нет аккаунта?</p>
                        <Link className={classes.link} to={"/registration"}>Создать</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthPage