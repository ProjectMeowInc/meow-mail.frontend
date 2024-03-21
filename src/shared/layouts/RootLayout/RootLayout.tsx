import React from "react"
import { Outlet } from "react-router"
import { useRootLayout } from "./useRootLayout"
import HeaderMobile from "../../components/Header/HeaderMobile/HeaderMobile"
import classes from "./rootLayout.module.css"
import HeaderDesktop from "../../components/Header/HeaderDesktop/HeaderDesktop"
import DefaultUserImage from "../../components/DefaultUserImage/DefaultUserImage"
import { ClientService } from "../../services/ClientService"

const RootLayout = () => {

    const {deviceType, user} = useRootLayout()

    return (
        <>
            {ClientService.isMobileDevice(deviceType)
                ? <>
                    <HeaderMobile/>
                    <div className={classes.menu}/>
                    <Outlet/>
                </>
                : <div className={classes.wrapper}>
                    <div className={classes.app}>
                        <HeaderDesktop/>
                        <div className={classes.outlet_wrapper}>
                            <div className={classes.search}>
                                <div className={classes.user}>
                                    <DefaultUserImage/>

                                    <p>{user?.login}</p>
                                </div>
                            </div>
                            <Outlet/>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default RootLayout