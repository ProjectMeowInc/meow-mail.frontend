import React, { FC, PropsWithChildren } from "react"
import classes from "./button.module.css"

interface IButtonProps {
    onClick?: () => void
}

const Button: FC<PropsWithChildren<IButtonProps>> = ({children, onClick}) => {
    return (
        <button
            type={"submit"}
            onClick={onClick}
            className={classes.button}
        >
            {children}
        </button>
    )
}

export default Button