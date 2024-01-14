import React, {FC, PropsWithChildren} from 'react';
import {Dimensions, StyleProp, StyleSheet, Text, TouchableOpacity} from "react-native";
import {COLORS} from "../../../consts/COLORS";

interface ICustomButtonProps {
    onPress?: () => void
    styles?: StyleProp<any>
}

const CustomButton: FC<PropsWithChildren<ICustomButtonProps>> = ({styles, children}) => {
    return (
        <TouchableOpacity style={{...lStyles.button, ...styles}}>
            <Text style={lStyles.text}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};

const lStyles = StyleSheet.create({
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