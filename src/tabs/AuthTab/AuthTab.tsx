import React from 'react';
import {Dimensions, ImageBackground, StyleSheet} from "react-native";
import {Wrapper} from "../../shared/UI/Wrapper/Wrapper";
import {WelcomeMessage} from "./UI/WelcomeMessage/WelcomeMessage";
import {AuthForm} from "./UI/AuthForm/AuthForm";
import {ServerStatus} from "./UI/ServerStatus/ServerStatus";

const AuthTab = () => {


    return (
        <Wrapper>
            <ImageBackground
                source={require("../../assets/images/backgroundAuth.jpg")}
                imageStyle={{borderTopRightRadius: 30, borderTopLeftRadius: 30}}
                style={styles.background}
            >
                <WelcomeMessage/>
                <AuthForm styles={styles.form}/>
                <ServerStatus/>
            </ImageBackground>
        </Wrapper>
    );
};

const styles= StyleSheet.create({
    background: {
        height: Dimensions.get("window").height
    },
    message: {
        flex: 2,
    },
    form: {
        flex: 4,
        backgroundColor: "rgba(0, 0, 0, 0)",
    },
    status: {
        flex: 1,
    }
})

export default AuthTab;