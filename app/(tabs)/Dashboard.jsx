import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import Slider from "@/components/Slider";
import { UserContext } from "@/scripts/UserContext";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import React, { useContext, useEffect } from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const Dashboard = () => {
  const accesstoken = sessionStorage.getItem("accesstoken");
  const { token, setToken } = useContext(UserContext);
  const { userData, setUserData } = useContext(UserContext);

  const { login, setLogin } = useContext(UserContext);

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
      if (!token) {
        setToken(accesstoken);
      }
      try {
        const response = await axios.get(
          "https://sortcity.ap-south-1.elasticbeanstalk.com:443/userDetails",
          {
            headers: {
              Authorization: `Bearer ${accesstoken}`,
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
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <Background />
        <Navbar />
        <View style={styles.txtWrap}>
          <Text style={styles.txt}>Launching soon!</Text>
        </View>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollCon}
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

const styles = StyleSheet.create({
  container: { flex: 1, position: "relative" },
  txtWrap: {
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  txt: {
    fontFamily: "Andale Mono, monospace",
    fontWeight: "bold",
    fontSize: 44,
    color: "#0a2e4dff",
  },
  scrollCon: {
    flexGrow: 1,
    position: "relative",
    paddingBottom: 40,
  },
});
