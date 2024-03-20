import React from "react"
import { Outlet } from "react-router"
import { useRootLayout } from "./useRootLayout"
import HeaderMobile from "../../components/Header/HeaderMobile/HeaderMobile"
import classes from "./rootLayout.module.css"

const RootLayout = () => {

    const {deviceType} = useRootLayout()

    return (
        <>
            {deviceType === "smartphone" || deviceType === "tablet"
                ? <>
                    <HeaderMobile/>
                    <div className={classes.menu}/>
                </>
                : <></>
            }
            <Outlet/>
        </>
    )
}

export default RootLayout