import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { UserContext } from "@/scripts/UserContext";
import { Tabs, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useContext } from "react";
import { Platform } from "react-native";

export default function TabLayout() {
  const router = useRouter();
  const { token, setToken } = useContext(UserContext);
  const { userData, setUserData } = useContext(UserContext);
  const { login, setLogin } = useContext(UserContext);
  const colorScheme = useColorScheme();
  const handleLogout = async () => {
    try {
      if (Platform.OS !== "web") {
        await SecureStore.deleteItemAsync("jwt");
      }

      setUserData(null);
      setToken("");
      setLogin(false);
      alert("Logout successful!");
      router.replace("/");

      console.log("Logout successful");
    } catch (error) {
      console.error(error);
      alert("Logout failed due to some reason!");
    }
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: true,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          href: null, // to hide from the tabs
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          href: null,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Dashboard"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
