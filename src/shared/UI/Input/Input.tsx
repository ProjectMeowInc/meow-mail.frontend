import React, {FC} from 'react';
import {Dimensions, StyleSheet, TextInput} from "react-native";
import {RALEWAY} from "../../../consts/RALEWAY";
import {COLORS} from "../../../consts/COLORS";

interface IInputProps {
    placeholder?: string
    onChange?: () => Promise<void>
}

const Input: FC<IInputProps> = ({placeholder, onChange}) => {
    return (
        <TextInput
            onChange={onChange}
            style={[styles.input, styles.shadow]}
            placeholder={placeholder}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        borderStyle: "solid",
        backgroundColor: COLORS.white,
        borderRadius: 100,
        paddingLeft: 20,
        paddingTop: 10,
        paddingBottom: 10,
        width: Dimensions.get("window").width / 1.25,
        fontSize: 20,
        fontFamily: RALEWAY.Raleway_500Medium,
    },

    shadow: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 20
    },
})

export default Input;