import axios from "axios";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import mainStyles from "@/styles/mainStyles";
import * as SecureStore from "expo-secure-store";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthStyles from "./AuthStyles";
import InputForm from "./InputForm";

export default function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      if (!username || !password) {
        alert("Please fill in all the fields.");
      }
      const response = await axios.post(
        "http://192.168.1.13:8080/api/auth/login",
        {
          username,
          password,
        }
      );

      const token = response.data.token;
      await SecureStore.setItemAsync("jwt", token);
      console.log("Token saved securely");
      navigation.replace("Dashboard");
    } catch (error) {
      console.error(error);
    }
  };
  const styles = AuthStyles();
  const mainStyle = mainStyles();
  return (
    <SafeAreaView style={mainStyle.parent}>
      <View style={styles.main}>
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
        <View>
          <TouchableOpacity style={styles.btn} onPress={handleLogin}>
            <Text style={styles.btntxt}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
