import React, { FC, PropsWithChildren } from "react"
import { Link } from "react-router-dom"
import classes from "./adminDropDownMenuItem.module.css"

interface IAdminDropDownMenuItemProps {
    href: string
    onClick?: () => void
}

const AdminDropDownMenuItem: FC<PropsWithChildren<IAdminDropDownMenuItemProps>> = ({ children, onClick, href }) => {
    return (
        <Link to={href} className={classes.link} onClick={onClick}>
            {children}
        </Link>
    )
}

export default AdminDropDownMenuItem
