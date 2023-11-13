import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "./screens/Main";
import LoginScreen from "./screens/Login";
import SignupScreen from "./screens/Signup";
import InterestsScreen from "./screens/Interests";

const RootStack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name='Main'
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name='Login'
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name='Signup'
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name='Interests'
          component={InterestsScreen}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
