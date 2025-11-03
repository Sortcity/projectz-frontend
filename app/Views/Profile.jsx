import Background from "@/components/Background";
import { UserContext } from "@/scripts/UserContext";
import mainStyles from "@/styles/mainStyles";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useContext, useEffect } from "react";
import {
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthStyles from "./Auth/AuthStyles";

const Profile = () => {
  const { token, setToken } = useContext(UserContext);
  const { userData, setUserData } = useContext(UserContext);
  const router = useRouter();
  const styles = mainStyles();
  const { login, setLogin } = useContext(UserContext);
  const newStyles = AuthStyles();
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

  return login ? (
    <View style={{ flex: 1, position: "relative" }}>
      <SafeAreaView style={[styles.parent]}>
        <Background />
        <View
          style={{
            alignItems: "flex-end",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <TouchableOpacity
              onPress={() => {
                router.replace("/Views/Dashboard");
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
                  width: 100,
                }}
              >
                Dashboard
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignItems: "flex-end",
            }}
          >
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
        </View>
        {userData ? (
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
        ) : (
          <Text>Loading user details...</Text>
        )}
      </SafeAreaView>
    </View>
  ) : (
    alert("Restricted access! User not logged in.")
  );
};

export default Profile;
