import Background from "@/components/Background";
import Slider from "@/components/Slider";
import { UserContext } from "@/scripts/UserContext";
import mainStyles from "@/styles/mainStyles";
import axios from "axios";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useContext, useEffect } from "react";
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const Dashboard = () => {
  const { token, setToken } = useContext(UserContext);
  const { userData, setUserData } = useContext(UserContext);
  const router = useRouter();
  const styles = mainStyles();
  const { login, setLogin } = useContext(UserContext);

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

  useEffect(() => {
    if (!Platform.OS == "web") {
      const loadToken = async () => {
        const storedToken = await SecureStore.getItemAsync("jwt");
        if (storedToken) {
          setToken(storedToken);
        }
      };
      loadToken();
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

  return userData ? (
    <View style={{ flex: 1, position: "relative" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Background />
        <View
          style={{
            alignItems: "flex-end",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color: "white",
              borderRadius: 8,
              backgroundColor: "#113F67",
              padding: 2,
              margin: 2,
              borderWidth: 1,
              width: 70,
            }}
          >
            Credits: {userData.body.credits}
          </Text>
          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            <TouchableOpacity
              onPress={() => {
                router.replace("/Views/Profile");
              }}
            >
              <Text
                style={{
                  color: "white",
                  borderRadius: 8,
                  backgroundColor: "#113F67",
                  padding: 2,
                  margin: 2,
                  borderWidth: 1,
                  width: 55,
                }}
              >
                {userData.body.username}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handleLogout}>
            <Text
              style={{
                color: "white",
                borderRadius: 8,
                backgroundColor: "#113F67",
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
        <View
          style={{
            margin: 20,
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
          }}
        >
          <Text
            style={{
              fontFamily: "Andale Mono, monospace",
              fontWeight: "bold",
              fontSize: 44,
              color: "#0a2e4dff",
            }}
          >
            Launching soon!
          </Text>
        </View>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            flexGrow: 1,
            position: "relative",
            paddingBottom: 40, // gives space for bottom content on web
          }}
        >
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Slider />
          </GestureHandlerRootView>
        </ScrollView>
      </SafeAreaView>
    </View>
  ) : (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Loading user details...</Text>
    </View>
  );
};

export default Dashboard;
