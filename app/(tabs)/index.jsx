import Register from "@/components/Views/Auth/Register";
import Dashboard from "@/components/Views/Dashboard";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Login from "../../components/Views/Auth/Login";

export default function HomeScreen() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  );
}
