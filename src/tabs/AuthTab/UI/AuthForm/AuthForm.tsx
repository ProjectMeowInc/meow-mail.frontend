import React, {FC} from "react";
import {KeyboardAvoidingView, Platform, StyleProp, StyleSheet} from "react-native";
import Input from "../../../../shared/UI/Input/Input";

import {ScreenUtil} from "../../../../shared/utils/ScreenUtil";
import CustomButton from "../../../../shared/UI/Button/CustomButton";


interface IAuthFormProps {
    styles?: StyleProp<any>
}

export const AuthForm: FC<IAuthFormProps> = ({styles}) => {
    return (
        <KeyboardAvoidingView
            style={{
                ...styles,
                ...lStyles.form,
                backgroundColor: "grey"
            }}
            behavior={"padding"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        >
            <Input placeholder={"Введите логин"} />
            <Input placeholder={"Введите пароль"} />
            <CustomButton styles={lStyles.button}>
                Авторизоваться
            </CustomButton>
        </KeyboardAvoidingView>
    )
}

const lStyles = StyleSheet.create({
    form: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 20,
        paddingBottom: ScreenUtil.calculateWindowHeightPercent(15)
    },
    button: {
        marginBottom: ScreenUtil.calculateWindowHeightPercent(20)
    }
})