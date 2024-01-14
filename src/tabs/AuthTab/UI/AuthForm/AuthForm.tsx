import React, {FC} from "react";
import {Button, KeyboardAvoidingView, Platform, StyleProp, StyleSheet, View} from "react-native";
import Input from "../../../../shared/UI/Input/Input";
import NamedStyles = StyleSheet.NamedStyles;
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
                ...cstyles.form,
                backgroundColor: "grey"
            }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={95}
        >
            <Input placeholder={"Введите логин"} />
            <Input placeholder={"Введите пароль"} />
            <CustomButton>
                Авторизоваться
            </CustomButton>
        </KeyboardAvoidingView>
    )
}

const cstyles = StyleSheet.create({
    form: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 20,
        paddingBottom: ScreenUtil.calculateWindowHeightPercent(15)
    }
})