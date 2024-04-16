import React from "react"
import Input from "../../../../shared/components/Input/Input"
import Button from "../../../../shared/components/Button/Button"
import classes from "./changePasswordForm.module.css"
import { useChangePasswordForm } from "./useChangePasswordForm"

const ChangePasswordForm = () => {
    const { SubmitHandler, ChangeHandler } = useChangePasswordForm()

    return (
        <form className={classes.form} onSubmit={SubmitHandler}>
            <label className={classes.label}>Смена пароля</label>
            <Input
                onChange={ChangeHandler}
                name={"old_password"}
                placeholder={"Введите старый пароль"}
                required={true}
                type={"password"}
                inputType={1}
            />

            <Input
                onChange={ChangeHandler}
                name={"new_password"}
                placeholder={"Введите новый пароль"}
                required={true}
                type={"password"}
                inputType={1}
            />

            <Input
                onChange={ChangeHandler}
                name={"confirm_password"}
                placeholder={"Повторите новый пароль"}
                required={true}
                type={"password"}
                inputType={1}
            />

            <Button>Отправить</Button>
        </form>
    )
}

export default ChangePasswordForm
