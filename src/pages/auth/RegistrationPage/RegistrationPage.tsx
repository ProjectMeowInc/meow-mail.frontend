import React from "react"
import classes from "./registrationPage.module.css"
import Form from "../UI/Form/Form"
import { Link } from "react-router-dom"
import { useRegistrationPage } from "./useRegistrationPage"

const RegistrationPage = () => {
    const { isLoading, SubmitHandler, ChangeHandler, inputErrors } = useRegistrationPage()

    return (
        <div className={classes.wrapper}>
            <h1 className={classes.logo}>MeowMail</h1>
            <div className={classes.modal}>
                <p className={classes.caption}>Регистрация через логин и пароль</p>
                <Form
                    inputErrors={inputErrors}
                    isLoading={isLoading}
                    onSubmit={SubmitHandler}
                    onChange={ChangeHandler}
                />

                <div className={classes.links}>
                    <div className={classes.modal_item}>
                        <p>Есть аккаунт?</p>
                        <Link className={classes.link} to={"/"}>
                            Войдите
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegistrationPage
