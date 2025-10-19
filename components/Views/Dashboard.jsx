import mainStyles from "@/styles/mainStyles";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

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
        return userData;
      } catch (error) {
        console.error("Error fetching user details:", error);
        return null;
      }
    };
    fetchUserDetails();
  }, [token]);
  return (
    <View style={styles.parent}>
      <Text>{JSON.stringify(userData)}</Text>
    </View>
  );
};

export default Dashboard;
