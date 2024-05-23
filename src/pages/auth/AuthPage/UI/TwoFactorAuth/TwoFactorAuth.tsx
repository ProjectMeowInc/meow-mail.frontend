import React, { FC, FormEvent } from "react"
import Button from "../../../../../shared/components/Button/Button"
import Input from "../../../../../shared/components/Input/Input"
import classes from "./twoFactorAuth.module.css"

interface ITwoFactorAuthProps {
    submitHandler: (event: FormEvent) => void
    changeHandler: (ctx: string) => void
}

const TwoFactorAuth: FC<ITwoFactorAuthProps> = ({ submitHandler, changeHandler }) => {
    return (
        <form onSubmit={submitHandler} className={classes.form}>
            <Input
                onChange={(event) => changeHandler(event.fieldValue)}
                name={"code"}
                placeholder={"Введите код из телеграмма"}
                inputType={1}
                type={"text"}
                required={true}
            />
            <Button>Отправить</Button>
        </form>
    )
}

export default TwoFactorAuth
