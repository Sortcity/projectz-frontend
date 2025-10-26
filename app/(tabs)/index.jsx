import Register from "@/components/Views/Auth/Register";
import Dashboard from "@/components/Views/Dashboard";
import Demographics from "@/components/Views/Demographics";
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
      <Stack.Screen name="Demographics" component={Demographics} />
    </Stack.Navigator>
  );
}
