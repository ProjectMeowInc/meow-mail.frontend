import React, { FC, FormEvent } from "react"
import Button from "../../../../../shared/components/Button/Button"
import Input from "../../../../../shared/components/Input/Input"
import classes from "./twoFactorAuth.module.css"
import { IOnChangeEvent } from "../../../../../shared/events/IOnChangeEvent"

interface ITwoFactorAuthProps {
    submitHandler: (event: FormEvent) => void
    changeHandler: (data: IOnChangeEvent) => void
}

const TwoFactorAuth: FC<ITwoFactorAuthProps> = ({ submitHandler, changeHandler }) => {
    return (
        <form onSubmit={submitHandler} className={classes.form}>
            <Input
                onChange={changeHandler}
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
