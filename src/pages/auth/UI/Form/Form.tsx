import React, { FC, FormEvent } from "react"
import Input from "../../../../shared/components/Input/Input"
import Button from "../../../../shared/components/Button/Button"
import classes from "./form.module.css"
import { IOnChangeEvent } from "../../../../shared/events/IOnChangeEvent"
import { useForm } from "./useForm"
import { IInputError } from "../../../../shared/components/Input/IInputError"

interface IFormProps {
    onSubmit?: (e: FormEvent) => Promise<void>
    onChange: (data: IOnChangeEvent) => void
    isLoading: boolean
    inputErrors?: IInputError[]
}

const Form: FC<IFormProps> = ({ onSubmit, onChange, isLoading, inputErrors }) => {
    const { SubmitHandler } = useForm()

    return (
        <form className={classes.form} method={"post"} onSubmit={(e) => SubmitHandler(e, isLoading, onSubmit)}>
            <Input error={inputErrors} onChange={onChange} type={"text"} name={"login"} placeholder={"Введите логин"} />
            <Input
                error={inputErrors}
                onChange={onChange}
                type={"password"}
                name={"password"}
                placeholder={"Введите пароль"}
            />
            <Button isLoading={isLoading}>Отправить</Button>
        </form>
    )
}

export default Form
