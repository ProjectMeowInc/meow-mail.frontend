import React, { FC, PropsWithChildren } from "react"
import { NavLink } from "react-router-dom"
import classes from "./menuItem.module.css"

interface IMenuItemProps {
    href: string
}

const MenuItem: FC<PropsWithChildren<IMenuItemProps>> = ({ children, href }) => {
    return (
        <NavLink to={href} className={({ isActive }) => (isActive ? classes.active : classes.none_active)}>
            {children}
        </NavLink>
    )
}

export default MenuItem
