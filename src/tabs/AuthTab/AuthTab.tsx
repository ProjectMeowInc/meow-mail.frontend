import React from 'react';
import {StyleSheet} from "react-native";
import {Wrapper} from "../../shared/UI/Wrapper/Wrapper";
import {WelcomeMessage} from "./UI/WelcomeMessage/WelcomeMessage";
import {AuthForm} from "./UI/AuthForm/AuthForm";
import {ServerStatus} from "./UI/ServerStatus/ServerStatus";

const AuthTab = () => {


    return (
        <Wrapper>
            <WelcomeMessage/>
            <AuthForm styles={styles.form}/>
            <ServerStatus/>
        </Wrapper>
    );
};

const styles= StyleSheet.create({
    message: {
        flex: 2,
    },
    form: {
        flex: 4,
    },
    status: {
        flex: 1,
    }
})

export default AuthTab;