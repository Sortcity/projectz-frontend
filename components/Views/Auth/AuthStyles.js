import { StyleSheet } from "react-native";

export default function AuthStyles() {
  const authStyles = StyleSheet.create({
    main: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      color: "#113F67",
      fontSize: 24,
      fontWeight: "bold",
    },
    text: {
      color: "#2C5049",
      fontSize: 24,
      fontWeight: "bold",
    },
    form: {
      margin: 10,
      width: 250,
      height: 40,
      backgroundColor: "#EEEEEE",
      borderRadius: 10,
      padding: 10,
    },
    formcon: {
      margin: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    btn: {
      width: 250,
      height: 40,
      margin: 10,
      padding: 10,
      backgroundColor: "#113F67",
      borderRadius: 10,
      alignItems: "center",
    },
    btntxt: {
      color: "white",
    },
  });
  return authStyles;
}
