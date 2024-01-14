import {Dimensions, StyleSheet, View} from "react-native";
import {FC, ReactNode} from "react";

interface IWrapperProps {
    children: ReactNode,
}

export const Wrapper: FC<IWrapperProps> = ({children}) => {
    return (
        <View style={styles.view}>
            {children}
        </View>
    )
}

const styles= StyleSheet.create({
    view: {
        // todo: fix this
        paddingTop: 30,
        paddingLeft: 5,
        paddingRight: 5,
        paddingEnd: 5,
        minHeight: Dimensions.get("screen").height,
        backgroundColor: "black"
    }
})