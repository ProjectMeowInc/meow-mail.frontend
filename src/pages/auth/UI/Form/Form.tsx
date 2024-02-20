import React from "react"
import Input from "../../../../shared/components/Input/Input"
import Button from "../../../../shared/components/Button/Button"
import classes from "./form.module.css"

const Form = () => {
    return (
        <form className={classes.form} method={"post"}>
            <Input type={"email"} name={"login"} placeholder={"Введите логин"}/>
            <Input type={"email"} name={"password"} placeholder={"Введите пароль"}/>
            <Button>Отправить</Button>
        </form>
    )
}

export default Form