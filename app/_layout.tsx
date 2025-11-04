import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { UserProvider } from "@/scripts/UserContext";
import { useEffect } from "react";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (typeof document !== "undefined") {
      let viewport = document.querySelector('meta[name="viewport"]');
      if (!viewport) {
        const meta = document.createElement("meta");
        meta.setAttribute("name", "viewport");
        meta.setAttribute(
          "content",
          "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        );
        document.head.appendChild(meta);
      } else {
        viewport.setAttribute(
          "content",
          "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        );
      }
    }
  }, []);

  return (
    <UserProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{ presentation: "modal", title: "Modal" }}
          />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </UserProvider>
  );
}
