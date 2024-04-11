import React, { FC, PropsWithChildren } from "react"
import { Link } from "react-router-dom"
import classes from "./adminDropDownMenuItem.module.css"

interface IAdminDropDownMenuItemProps {
    href: string
}

const AdminDropDownMenuItem: FC<PropsWithChildren<IAdminDropDownMenuItemProps>> = ({ children, href }) => {
    return (
        <Link to={href} className={classes.link}>
            {children}
        </Link>
    )
}

export default AdminDropDownMenuItem
