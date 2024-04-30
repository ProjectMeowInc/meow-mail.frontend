import React from "react"
import { Outlet } from "react-router"
import { useRootLayout } from "./useRootLayout"
import HeaderMobile from "../../components/Header/HeaderMobile/HeaderMobile"
import classes from "./rootLayout.module.css"
import HeaderDesktop from "../../components/Header/HeaderDesktop/HeaderDesktop"
import { ClientService } from "../../services/ClientService"
import SendEmailForm from "../../components/SendEmailForm/SendEmailForm"

const RootLayout = () => {
    const { deviceType, user, QuitHandler, isActiveSendForm, setIsActiveSendForm } = useRootLayout()

    return (
        <>
            {ClientService.isMobileDevice(deviceType) ? (
                <>
                    <HeaderMobile onClickSendButton={() => setIsActiveSendForm(true)} />
                    <div className={classes.menu} />
                    <div className={classes.outlet_mobile}>
                        <Outlet />
                    </div>
                    {isActiveSendForm && <SendEmailForm closeForm={() => setIsActiveSendForm(false)} />}
                </>
            ) : (
                <div className={classes.wrapper}>
                    <div className={classes.app}>
                        <HeaderDesktop onClickSendButton={() => setIsActiveSendForm(true)} />
                        <div className={classes.outlet_wrapper}>
                            <div className={classes.right_side}>
                                <div className={classes.user}>
                                    <p>{user?.login}</p>
                                </div>
                                <p className={classes.quit} onClick={() => QuitHandler()}>
                                    Выйти
                                </p>
                            </div>
                            <div className={classes.content}>
                                <Outlet />
                            </div>
                            {isActiveSendForm && <SendEmailForm closeForm={() => setIsActiveSendForm(false)} />}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default RootLayout
