import React from "react"
import { Outlet } from "react-router"
import { useRootLayout } from "./useRootLayout"
import HeaderMobile from "../../components/Header/HeaderMobile/HeaderMobile"
import classes from "./rootLayout.module.css"
import HeaderDesktop from "../../components/Header/HeaderDesktop/HeaderDesktop"
import DefaultUserImage from "../../components/DefaultUserImage/DefaultUserImage"
import { ClientService } from "../../services/ClientService"
import Input from "../../components/Input/Input"

import {ReactComponent as Search} from "../../icons/search.svg"

const RootLayout = () => {

    const {deviceType, user, setSubject} = useRootLayout()

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
                                <Input
                                    name={"search"}
                                    style={{width: "30%"}}
                                    inputType={2}
                                    icon={<Search/>}
                                    placeholder={"Начните вводить..."}
                                    onChange={({fieldValue}) => setSubject(fieldValue)}
                                />
                                <div className={classes.user}>
                                    <DefaultUserImage/>

                                    <p>{user?.login}</p>
                                </div>
                            </div>
                            <div className={classes.content}>
                                <Outlet/>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default RootLayout