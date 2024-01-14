import {Dimensions, SafeAreaView, StyleSheet, Text} from 'react-native';
import AuthTab from "./app/(tabs)/AuthTab";
import {COLORS} from "./src/consts/COLORS";
import {
  Raleway_200ExtraLight,
  Raleway_100Thin,
  Raleway_300Light,
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_600SemiBold,
  Raleway_700Bold,
  Raleway_800ExtraBold,
  Raleway_900Black,
  useFonts
} from "@expo-google-fonts/raleway";
import React from "react";

export default function App() {
  const [fontLoaded ] = useFonts({
    Raleway_100Thin,
    Raleway_200ExtraLight,
    Raleway_300Light,
    Raleway_400Regular,
    Raleway_500Medium,
    Raleway_600SemiBold,
    Raleway_700Bold,
    Raleway_800ExtraBold,
    Raleway_900Black
  })

  if (!fontLoaded) {
    return <Text>Loading...</Text>
  }

  return (
    <SafeAreaView style={styles.container}>
      <AuthTab/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: COLORS.black,
  },
});