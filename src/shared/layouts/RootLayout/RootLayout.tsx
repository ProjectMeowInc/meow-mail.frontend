import React from "react"
import { Outlet } from "react-router"
import { useRootLayout } from "./useRootLayout"
import HeaderMobile from "../../components/Header/HeaderMobile/HeaderMobile"
import classes from "./rootLayout.module.css"
import HeaderDesktop from "../../components/Header/HeaderDesktop/HeaderDesktop"
import DefaultUserImage from "../../components/DefaultUserImage/DefaultUserImage"
import { ClientService } from "../../services/ClientService"
import Input from "../../components/Input/Input"
import Search from "../../icons/search.svg?react"
import SendEmailForm from "../../components/SendEmailForm/SendEmailForm"
import Left from "../../icons/chevron-left.svg?react"
import Right from "../../icons/chevron-right.svg?react"

const RootLayout = () => {
    const { deviceType, user, setSubject, QuitHandler, isActiveSendForm, setIsActiveSendForm, mailsCount, MovePage } =
        useRootLayout()

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
                            <div className={classes.search}>
                                <Input
                                    name={"search"}
                                    style={{ width: "30%" }}
                                    inputType={2}
                                    icon={<Search />}
                                    placeholder={"Начните вводить..."}
                                    onChange={({ fieldValue }) => setSubject(fieldValue)}
                                />
                                <div className={classes.right_side}>
                                    <div className={classes.controls}>
                                        <p className={classes.count}>1 - {mailsCount}</p>
                                        <div>
                                            <Left className={classes.icon} onClick={() => MovePage(-1)} />
                                            <Right className={classes.icon} onClick={() => MovePage(1)} />
                                        </div>
                                    </div>
                                    <div className={classes.user}>
                                        <DefaultUserImage />
                                        <p>{user?.login}</p>
                                    </div>
                                    <p className={classes.quit} onClick={() => QuitHandler()}>
                                        Выйти
                                    </p>
                                </div>
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
