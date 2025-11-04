import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";

import Background from "@/components/Background";
import { UserContext } from "@/scripts/UserContext";
import mainStyles from "@/styles/mainStyles";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthStyles from "./AuthStyles";
import InputForm from "./InputForm";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [acessToken, setAccessToken] = useState("");
  const { token, setToken } = useContext(UserContext);
  const { login, setLogin } = useContext(UserContext);

  const userAgent = Platform.OS === "ios" || "android" ? "mobile" : "web";

  useEffect(() => {
    if (login) {
      router.replace("/Dashboard");
    }
  }, [login]);

  const handleLogin = async () => {
    try {
      if (!username || !password) {
        alert("Please fill in all the fields.");
      }
      const response = await axios.post(
        "https://sortcity.ap-south-1.elasticbeanstalk.com:443/api/auth/login",
        {
          username,
          password,
        },
        {
          headers: {
            "X-Client-Platform": userAgent,
            "Content-Type": "application/json",
          },
        }
      );

      const accesstoken = response.data.token;
      if (Platform.OS == "web") {
        setToken(accesstoken);
        sessionStorage.setItem("accesstoken", accesstoken);
      } else {
        await SecureStore.setItemAsync("jwt", accesstoken);
        await SecureStore.setItemAsync("refresh", response.data.refreshToken);
      }
      console.log("Auth Success.");
      setLogin(true);
      router.replace("/Dashboard");
    } catch (error) {
      if (error.response) {
        alert(error.response.data);
        console.log("Error response:", error.response.data);
      } else alert("Login failed. Please try again.");
      console.error(error);
    }
  };
  const styles = AuthStyles();
  const mainStyle = mainStyles();
  return (
    <SafeAreaView style={[mainStyle.parent, { flex: 1, position: "relative" }]}>
      <Background />
      <View style={styles.main}>
        <View>
          <View>
            <InputForm
              FormName={"Username"}
              AutoComplete={"username"}
              Placeholder={"Enter your username..."}
              value={username}
              setValue={setUsername}
            />
            <InputForm
              FormName={"Password"}
              SecureTextEntry={true}
              AutoComplete={"password"}
              Placeholder={"Enter your password..."}
              value={password}
              setValue={setPassword}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity style={styles.btn} onPress={handleLogin}>
              <Text style={styles.btntxt}>Login</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
              Don't have an account?
            </Text>
            <TouchableOpacity
              style={{ color: "#113F67" }}
              onPress={() => router.push("/Views/Auth/Register")}
            >
              <Text>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
