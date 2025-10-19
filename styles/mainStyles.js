import { StyleSheet } from "react-native";
export default function mainStyles() {
  const styles = StyleSheet.create({
    parent: {
      flex: 1,
      backgroundColor: "#FCF9EA",
    },
    titleContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    stepContainer: {
      gap: 8,
      marginBottom: 8,
    },
    welcomeText: {
      color: "#4A90E2",
      fontSize: 24,
      fontWeight: "bold",
    },
  });
  return styles;
}
