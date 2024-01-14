import React from 'react';
import {
    Dimensions,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    View
} from "react-native";
import Input from "../../src/components/Input/Input";
import CustomButton from "../../src/components/Button/CustomButton";
import {COLORS} from "../../src/consts/COLORS";
import {HEADERS} from "../../src/consts/HEADERS";
import {RALEWAY} from "../../src/consts/RALEWAY";
import {useAuthTab} from "./useAuthTab";

const AuthTab = () => {

    const {ClickHandler} = useAuthTab()

    return (
        <ImageBackground
            source={require("../../src/assets/images/backgroundAuth.jpg")}
            resizeMode={"contain"}
            style={styles.background}
            imageStyle={{borderTopLeftRadius: 30, borderTopRightRadius: 30, height: Dimensions.get("window").height}}
        >
            <Text style={styles.caption}>Добро пожаловать</Text>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.form}
            >
                <Input placeholder={"Введите логин"}/>
                <Input placeholder={"Введите пароль"}/>
                <CustomButton onPress={ClickHandler}>Войти</CustomButton>
            </KeyboardAvoidingView>

            <View style={styles.status}>
                <Text>Server status: ...</Text>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({

    background: {
        flex: 10,
        display: "flex",
        width: Dimensions.get("window").width,
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: COLORS.black,
        color: COLORS.white,
        justifyContent: "space-around",
        alignItems: "center"
    },

    form: {
        display: "flex",
        flexDirection: "column",
        flex: 2,
        width: Dimensions.get("window").width,
        alignItems: "center",
        justifyContent: "space-evenly"
    },

    caption: {
        flex: 2,
        fontSize: HEADERS.h1,
        fontFamily: RALEWAY.Raleway_500Medium,
        color: COLORS.white
    },

    status: {
        flex: 1
    }
})

export default AuthTab;