import React from "react"
import classes from "./addToFactor.module.css"
import Copy from "../../../../shared/icons/clipboard-copy.svg?react"
import { useAddToFactor } from "./useAddToFactor"
import Button from "../../../../shared/components/Button/Button"

const AddToFactor = () => {
    const { CopyHandler, ClickHandler, code } = useAddToFactor()

    return (
        <div className={classes.wrapper}>
            <p className={classes.caption}>Подключить двухэтапную аунтентификацию</p>
            {code ? (
                <>
                    <p className={classes.description}>
                        Отсканируйте QR-код с помощью камеры, или перейдите в мессенджер по{" "}
                        <a
                            className={classes.link}
                            target={"_blank"}
                            href={"https://t.me/project_meow_mail_bot"}
                            rel="noreferrer"
                        >
                            ссылке
                        </a>{" "}
                        и введите код ниже:
                    </p>
                    <div className={classes.code_item}>
                        <p className={classes.code}>{code}</p>
                        <Copy className={classes.icon} onClick={CopyHandler} />
                    </div>
                </>
            ) : (
                <Button onClick={ClickHandler}>Подключить</Button>
            )}
        </div>
    )
}

export default AddToFactor