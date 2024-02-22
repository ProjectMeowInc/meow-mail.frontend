import React, { FC, FormEvent } from "react"
import Input from "../../../../shared/components/Input/Input"
import Button from "../../../../shared/components/Button/Button"
import classes from "./form.module.css"
import { IOnChangeError, IOnChangeEvent } from "../../../../shared/events/IOnChangeEvent"

interface IFormProps {
    onSubmit?: (e: FormEvent) => Promise<void>
    onChange: (data: IOnChangeEvent) => IOnChangeError[] | void
}

const Form: FC<IFormProps> = ({onSubmit, onChange}) => {
    return (
        <form className={classes.form} method={"post"} onSubmit={onSubmit}>
            <Input onChange={onChange} type={"text"} name={"login"} placeholder={"Введите логин"}/>
            <Input onChange={onChange} type={"password"} name={"password"} placeholder={"Введите пароль"}/>
            <Button>Отправить</Button>
        </form>
    )
}

export default Form