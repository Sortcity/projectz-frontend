import axios from "axios";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import Background from "@/components/Background";
import mainStyles from "@/styles/mainStyles";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthStyles from "./AuthStyles";
import InputForm from "./InputForm";

export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const router = useRouter();

  const handleRegister = async () => {
    try {
      if (!email || !username || !password) {
        alert("Please fill in all the fields.");
      }
      const response = await axios.post(
        "https://sortcity.ap-south-1.elasticbeanstalk.com:443/api/auth/registerUser",
        {
          email,
          username,
          password,
        }
      );

      alert("User Registered Successfully. Please Login.");
      await delay(3000);
      navigation.replace("Login");
    } catch (error) {
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
          <InputForm
            FormName={"Email"}
            AutoComplete={"email"}
            Placeholder={"Enter your email..."}
            value={email}
            setValue={setEmail}
          />
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
          <TouchableOpacity style={styles.btn} onPress={handleRegister}>
            <Text style={styles.btntxt}>Register</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>
          Already have an account?
        </Text>
        <TouchableOpacity
          style={{ color: "#113F67" }}
          onPress={() => router.push("/Views/Auth/Login")}
        >
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
