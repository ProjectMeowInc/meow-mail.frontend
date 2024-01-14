import React, {FC, PropsWithChildren} from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity} from "react-native";
import {COLORS} from "../../../consts/COLORS";

interface ICustomButtonProps {
    onPress?: () => void
    classes?: {
        width?: number
        height?: number
    }
}

const CustomButton: FC<PropsWithChildren<ICustomButtonProps>> = ({onPress, classes, children}) => {
    return (
        <TouchableOpacity style={classes ? {
            ...styles.button,
            width: classes.width,
            height: classes.height
        } : styles.button} onPress={onPress}>
            <Text style={styles.text}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: Dimensions.get("window").width / 2,
        height: 45,
        backgroundColor: COLORS.purple,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
    },
    text: {
        color: COLORS.white,
        fontSize: 20,
        fontWeight: "500"
    }
})

export default CustomButton;