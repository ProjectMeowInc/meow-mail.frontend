import React, { FC } from "react"
import classes from "./sendEmailForm.module.css"

import Close from "../../icons/plus-sm.svg?react"
import Input from "../Input/Input"
import { useSendEmailForm } from "./useSendEmailForm"
import { Editor } from "mate-ts"
import "../../../../node_modules/mate-ts/dist/style.css"

import Bold from "../../icons/editor/bold.png"
import Italic from "../../icons/editor/italic.png"
import Strike from "../../icons/editor/strikethrough.png"
import Numeric from "../../icons/editor/numbered list.png"
import Bullet from "../../icons/editor/bulleted list.png"
import Quote from "../../icons/editor/block quote.png"

interface ISendEmailFormProps {
    closeForm: () => void
}

const SendEmailForm: FC<ISendEmailFormProps> = ({ closeForm }) => {
    const { SubmitHandler, ChangeHandler } = useSendEmailForm(closeForm)

    return (
        <div className={classes.wrapper}>
            <div className={classes.header}>
                <h1 className={classes.caption}>Новое письмо</h1>
                <Close className={classes.icon} onClick={closeForm} />
            </div>

            <form className={classes.form} onSubmit={(e) => e.preventDefault()}>
                <div className={classes.fields}>
                    <Input
                        type={"email"}
                        name={"to"}
                        inputType={3}
                        placeholder={"Введите почту"}
                        fieldName={"Кому"}
                        onChange={ChangeHandler}
                    />

                    <Input
                        type={"text"}
                        name={"subject"}
                        inputType={3}
                        placeholder={"Введите тему"}
                        fieldName={"Тема"}
                        onChange={ChangeHandler}
                    />

                    <Editor
                        submitHandler={SubmitHandler}
                        placeholder={"Введите ваше сообщение"}
                        styles={{
                            accentColor: "var(--accent)",
                            backgroundColor: "var(--third)",
                        }}
                        icons={{
                            strikeIconHref: Strike,
                            boldIconHref: Bold,
                            italicIconHref: Italic,
                            markedListHref: Bullet,
                            numericListHref: Numeric,
                            quoteHref: Quote,
                        }}
                    />
                </div>
            </form>
        </div>
    )
}

export default SendEmailForm
