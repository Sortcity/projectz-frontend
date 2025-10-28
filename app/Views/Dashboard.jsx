import Background from "@/components/Background";
import mainStyles from "@/styles/mainStyles";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Dashboard = () => {
  const [token, setToken] = useState("");
  const { accesstoken } = useLocalSearchParams();
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
      setToken(accesstoken);
    }
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!token) return;
      try {
        const response = await axios.get(
          "https://sortcity.ap-south-1.elasticbeanstalk.com:443/userDetails",
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
        return user;
      } catch (error) {
        console.error("Error fetching user details:", error);
        return null;
      }
    };
    fetchUserDetails();
  }, [token]);
  return (
    <View style={{ flex: 1, position: "relative" }}>
      <SafeAreaView
        style={[
          styles.parent,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Background />
        <View
          style={{
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
          <View style={{ color: "white" }}>
            <Text>Username: {userData.body.username}</Text>
            <Text>Gender: {userData.body.gender}</Text>
            <Text>Date of Birth: {userData.body.dob}</Text>
            <Text>Credits: {userData.body.credits}</Text>
          </View>
        ) : (
          <Text>Loading user details...</Text>
        )}
      </SafeAreaView>
    </View>
  );
};

export default Dashboard;
