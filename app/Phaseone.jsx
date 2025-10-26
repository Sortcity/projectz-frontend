import AuthStyles from "@/components/Views/Auth/AuthStyles";
import InputForm from "@/components/Views/Auth/InputForm";
import mainStyles from "@/styles/mainStyles";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Phaseone = () => {
  const { username } = useLocalSearchParams();
  // const [username, setUsername] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password1, setPassword1] = useState("");
  const [password, setPassword] = useState("");

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleVerify = async () => {
    try {
      console.log(username, verificationCode, password1, password);
      if (!verificationCode || !username || !password1 || !password) {
        alert("Please fill in all the fields.");
      }
      if (password1 != password) {
        alert("Passwords do not match.");
      }
      const response = await axios.post(
        "https://sortcity.ap-south-1.elasticbeanstalk.com:443/api/auth/verify",
        {
          username,
          verificationCode,
          password,
        },
        {
          headers: {
            "X-type": "verify",
            "Content-Type": "application/json",
          },
        }
      );
      alert("User Verified Successfully. Please Login.");
      await delay(3000);
      navigation.replace("Demographics", { username: username });
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
          <View style={styles.formcon}>
            <Text style={styles.title}>Username</Text>
            <TextInput
              style={styles.form}
              value={username}
              editable="false"
              selectTextOnFocus="false"
            />
          </View>
          <InputForm
            FormName={"Passcode"}
            Placeholder={"Enter your passcode..."}
            value={verificationCode}
            setValue={setVerificationCode}
          />
          <InputForm
            FormName={"Password"}
            SecureTextEntry={true}
            AutoComplete={"password"}
            Placeholder={"Enter your password..."}
            value={password1}
            setValue={setPassword1}
          />
          <InputForm
            FormName={"Confirm your password"}
            SecureTextEntry={true}
            AutoComplete={"password"}
            Placeholder={"please confirm your password..."}
            value={password}
            setValue={setPassword}
          />
        </View>
        <View>
          <TouchableOpacity style={styles.btn} onPress={handleVerify}>
            <Text style={styles.btntxt}>Verify</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Phaseone;
