import {Dimensions, Platform, SafeAreaView, StatusBar, StyleSheet, View} from "react-native";
import {FC, ReactNode} from "react";

interface IWrapperProps {
    children: ReactNode,
}

export const Wrapper: FC<IWrapperProps> = ({children}) => {
    return (
        <SafeAreaView style={styles.view}>
            {children}
        </SafeAreaView>
    )
}

const styles= StyleSheet.create({
    view: {
        // todo: fix this
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        paddingLeft: 3,
        paddingRight: 3,
        minHeight: Dimensions.get("screen").height,
        backgroundColor: "black"
    }
})