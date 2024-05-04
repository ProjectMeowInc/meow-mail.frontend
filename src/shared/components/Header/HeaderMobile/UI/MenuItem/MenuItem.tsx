import React, { FC, PropsWithChildren } from "react"
import { Link } from "react-router-dom"
import classes from "./menuItem.module.css"

interface IMenuItemProps {
    icon: string
    href: string
    onClick?: () => void
}

const MenuItem: FC<PropsWithChildren<IMenuItemProps>> = ({ children, icon, href, onClick }) => {
    return (
        <Link to={href} className={classes.link} onClick={onClick}>
            <img src={icon} alt={"icon"} />
            {children}
        </Link>
    )
}

export default MenuItem
