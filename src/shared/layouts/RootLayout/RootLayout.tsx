import React from "react"
import { Outlet } from "react-router"
import { useRootLayout } from "./useRootLayout"
import HeaderMobile from "../../components/Header/HeaderMobile/HeaderMobile"

const RootLayout = () => {

    const {deviceType} = useRootLayout()

    return (
        <>
            {deviceType === "smartphone" || deviceType === "tablet"
                ? <HeaderMobile/>
                : <></>
            }
            <Outlet/>
        </>
    )
}

export default RootLayout