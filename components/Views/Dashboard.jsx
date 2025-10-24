import mainStyles from "@/styles/mainStyles";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Dashboard = ({ navigation, route }) => {
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState(null);

  const styles = mainStyles();

  const handleLogout = async () => {
    try {
      if (!Platform.OS == "web") {
        await SecureStore.deleteItemAsync("jwt");
      }

      setUserData(null);
      setToken("");
      alert("Logout successful!");
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });

      console.log("Logout successful");
    } catch (error) {
      console.error(error);
      alert("Logout failed due to some reason!");
    }
  };

  useEffect(() => {
    if (!Platform.OS == "web") {
      const loadToken = async () => {
        const storedToken = await SecureStore.getItemAsync("jwt");
        if (storedToken) {
          setToken(storedToken);
        }
      };
      loadToken();
    } else {
      const { webToken } = route.params;
      console.log("The webtoken:", webToken);
      setToken(webToken);
    }
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!token) return;
      try {
        const response = await axios.get(
          "http://192.168.1.7:8080/userDetails",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const user = response.data;
        if (user) {
          setUserData(user);
        }
        console.log("Fetched user details:", user);
        return user;
      } catch (error) {
        console.error("Error fetching user details:", error);
        return null;
      }
    };
    fetchUserDetails();
  }, [token]);
  return (
    <SafeAreaView style={styles.parent}>
      <View
        style={{
          width: "100%",
          height: 30,
          backgroundColor: "#16476A",
          alignItems: "flex-end",
        }}
      >
        <TouchableOpacity style={{ color: "#113F67" }} onPress={handleLogout}>
          <Text
            style={{
              color: "white",
              borderRadius: 8,
              backgroundColor: "grey",
              padding: 2,
              margin: 2,
              borderWidth: 1,
              width: 55,
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
      {userData ? (
        <View>
          <Text>Username: {userData.body.username}</Text>
          <Text>Gender: {userData.body.gender}</Text>
          <Text>Date of Birth: {userData.body.dob}</Text>
          <Text>Credits: {userData.body.credits}</Text>
        </View>
      ) : (
        <Text>Loading user details...</Text>
      )}
    </SafeAreaView>
  );
};

export default Dashboard;
