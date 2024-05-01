import React, { FC, FormEvent } from "react"
import Input from "../../../../shared/components/Input/Input"
import Button from "../../../../shared/components/Button/Button"
import classes from "./chech2FAForm.module.css"

interface IProps {
    submitHandler: (event: FormEvent) => void
    setVerifyCode: (code: string) => void
}

const Check2FaForm: FC<IProps> = ({ submitHandler, setVerifyCode }) => {
    return (
        <form onSubmit={submitHandler} className={classes.form}>
            <Input
                name={"token"}
                placeholder={"Введите код из телеграмма"}
                onChange={({ fieldValue }) => {
                    setVerifyCode(fieldValue)
                }}
                type={"text"}
                required={true}
            />

            <Button>Отправить</Button>
        </form>
    )
}

export default Check2FaForm
