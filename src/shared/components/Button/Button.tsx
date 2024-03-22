import React, { FC, PropsWithChildren } from "react"
import classes from "./button.module.css"

interface IButtonProps {
    onClick?: () => void
    isLoading?: boolean
    type?: number
    styles?: {
        width?: string
    }
}

const Button: FC<PropsWithChildren<IButtonProps>> = ({ children, onClick, isLoading, type, styles }) => {
    const ClickHandler = () => {
        if (isLoading) {
            return
        }

        onClick?.call(null)
    }

    switch (type) {
        case 1:
            return (
                <button
                    type={"submit"}
                    onClick={() => ClickHandler()}
                    className={isLoading ? classes.button_loading : classes.button}
                    style={{
                        width: styles?.width
                    }}
                >
                    {children}
                </button>
            )

        case 2:
            return (
                <button
                    type={"submit"}
                    onClick={() => ClickHandler()}
                    className={classes.button_white}
                    style={{
                        width: styles?.width
                    }}
                >
                    {children}
                </button>
            )

        default: return (
            <button
                type={"submit"}
                onClick={() => ClickHandler()}
                className={isLoading ? classes.button_loading : classes.button}
            >
                {children}
            </button>
        )
    }


}

export default Button
