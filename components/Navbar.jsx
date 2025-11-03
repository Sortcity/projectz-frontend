import { UserContext } from "@/scripts/UserContext";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useContext } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Navbar() {
  const { userData, setUserData } = useContext(UserContext);
  const { token, setToken } = useContext(UserContext);
  const { login, setLogin } = useContext(UserContext);
  const router = useRouter();
  const handleLogout = async () => {
    try {
      if (!Platform.OS == "web") {
        await SecureStore.deleteItemAsync("jwt");
      }
      setUserData(null);
      setToken("");
      setLogin(false);
      alert("Logout successful!");
      router.replace("/Views/Auth/Login");

      console.log("Logout successful");
    } catch (error) {
      console.error(error);
      alert("Logout failed due to some reason!");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.itemCon}>
        <FontAwesome5 name="chevron-circle-up" size={24} color="black" />
        <Text style={styles.txt}>Credits: {userData.body.credits}</Text>
      </View>

      <View style={styles.itemCon}>
        <Ionicons name="person" size={24} color="black" />
        <Text style={styles.txt}>{userData.body.username}</Text>
      </View>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.lgbtn}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(17, 63, 103, 0.05)", // dark transparent layer
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
  },

  txt: {
    color: "#113F67",
    borderRadius: 8,
    padding: 2,
    margin: 2,
    borderWidth: 1,
    fontWeight: "bold",
  },
  lgbtn: {
    color: "white",
    borderRadius: 8,
    backgroundColor: "#860e0eff",
    padding: 2,
    margin: 2,
    borderWidth: 1,
    width: 55,
    fontWeight: "bold",
  },
  itemCon: { justifyContent: "space-between", flexDirection: "row" },
});
