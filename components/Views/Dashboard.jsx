import mainStyles from "@/styles/mainStyles";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Dashboard = () => {
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState(null);

  const styles = mainStyles();
  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await SecureStore.getItemAsync("jwt");
      if (storedToken) {
        setToken(storedToken);
      }
    };
    loadToken();
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!token) return;
      try {
        const response = await axios.get(
          "http://192.168.1.13:8080/userDetails",
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
