import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import { UserContext } from "@/scripts/UserContext";
import mainStyles from "@/styles/mainStyles";
import * as SecureStore from "expo-secure-store";
import React, { useContext, useEffect } from "react";
import { Platform, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthStyles from "../Views/Auth/AuthStyles";

const Profile = () => {
  const { token, setToken } = useContext(UserContext);
  const { userData, setUserData } = useContext(UserContext);

  const styles = mainStyles();
  const { login, setLogin } = useContext(UserContext);
  const newStyles = AuthStyles();

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

  return userData ? (
    <View style={{ flex: 1, position: "relative" }}>
      <SafeAreaView style={[styles.parent]}>
        <Background />
        <Navbar />

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={newStyles.title}>Username</Text>
            <TextInput
              style={newStyles.form}
              value={userData.body.username}
              editable="false"
              selectTextOnFocus="false"
            />

            <Text style={newStyles.title}>Gender</Text>
            <TextInput
              style={newStyles.form}
              value={userData.body.gender}
              editable="false"
              selectTextOnFocus="false"
            />

            <Text style={newStyles.title}>Date of Birth</Text>
            <TextInput
              style={newStyles.form}
              value={userData.body.dob}
              editable="false"
              selectTextOnFocus="false"
            />

            <Text style={newStyles.title}>Credits</Text>
            <TextInput
              style={newStyles.form}
              value={userData.body.credits}
              editable="false"
              selectTextOnFocus="false"
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  ) : (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Loading user details...</Text>
    </View>
  );
};

export default Profile;
