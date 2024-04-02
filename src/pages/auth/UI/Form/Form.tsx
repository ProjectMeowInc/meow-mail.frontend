import React, { FC, FormEvent } from "react"
import Input from "../../../../shared/components/Input/Input"
import Button from "../../../../shared/components/Button/Button"
import classes from "./form.module.css"
import { IOnChangeEvent } from "../../../../shared/events/IOnChangeEvent"
import { useForm } from "./useForm"
import { IInputError } from "../../../../shared/components/Input/IInputError"
import Checkbox from "../../../../shared/components/Checkbox/Checkbox"

interface IFormProps {
    onSubmit?: (e: FormEvent) => Promise<void>
    onChange: (data: IOnChangeEvent) => void
    isLoading: boolean
    inputErrors?: IInputError[]
    isRegistration?: boolean
}

const Form: FC<IFormProps> = ({ onSubmit, isRegistration, onChange, isLoading, inputErrors }) => {
    const { SubmitHandler } = useForm()

    return (
        <form className={classes.form} method={"post"} onSubmit={(e) => SubmitHandler(e, isLoading, onSubmit)}>
            <Input required={true} error={inputErrors} onChange={onChange} type={"text"} name={"login"} placeholder={"Введите логин"} />
            <Input
                required={true}
                error={inputErrors}
                onChange={onChange}
                type={"password"}
                name={"password"}
                placeholder={"Введите пароль"}
            />
            {isRegistration && <Checkbox label={"Я согласен(-на) на обработку персонельных данных"}/>}
            <Button isLoading={isLoading}>Отправить</Button>
        </form>
    )
}

export default Form
