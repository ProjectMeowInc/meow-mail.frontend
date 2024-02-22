import React, { FC, PropsWithChildren } from "react"
import classes from "./button.module.css"

interface IButtonProps {
    onClick?: () => void
    isLoading?: boolean
}

const Button: FC<PropsWithChildren<IButtonProps>> = ({children, onClick, isLoading}) => {

    const ClickHandler = () => {
        if (isLoading) {
            return
        }

        onClick?.call(null)
    }

    return (
        <button
            type={"submit"}
            onClick={() => ClickHandler()}
            className={isLoading ? classes.button_loading : classes.button}
        >
            {children}
        </button>
    )
}

export default Button