import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Login from "../../components/Views/Auth/Login";

export default function HomeScreen() {
  // const url = "http://localhost:8080/api/auth/login";
  // const loginUser = () => {
  //   fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ username: "r18q2nuf", password: "p6Cm9jLIB(kq" }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("token received:", data);
  //     });
  // };
  // useEffect(() => {
  //   loginUser();
  // }, []);
  return (
    <SafeAreaView style={styles.parent}>
      {/* <Text style={styles.welcomeText}>Welcome</Text> */}
      <Login />
    </SafeAreaView>
  );
}

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
