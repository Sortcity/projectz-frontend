import axios from "axios";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthStyles from "./AuthStyles";
import InputForm from "./InputForm";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      if (!username || !password) {
        alert("Please fill in all the fields.");
      }
      const data = await axios.post("http://192.168.1.13:8080/api/auth/login", {
        username,
        password,
      });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  const styles = AuthStyles();
  return (
    <SafeAreaView style={styles.main}>
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
      <View style={styles.btn}>
        <TouchableOpacity>
          <Text style={styles.btntxt} onPress={handleLogin}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
