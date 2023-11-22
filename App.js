import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "./screens/Main";
import LoginScreen from "./screens/Login";
import SignupScreen from "./screens/Signup";
import InterestsScreen from "./screens/Interests";
import EventScreen from "./screens/Event";
import EventCreateScreen from "./screens/EventCreate";
<<<<<<< HEAD
import FiltersScreen from "./screens/Filters";
import { enGB, registerTranslation } from 'react-native-paper-dates'
registerTranslation('en-GB', enGB)
=======
import AllGroupView from "./screens/AllGroupView";
import CreateGroup from "./screens/CreateGroup";
import GroupScreen from "./screens/Group";
import AllUserView from "./screens/AllUserView";
>>>>>>> 1b44c8731032407ba23ca7280fdb8bf5f1b6efca

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
        <RootStack.Screen
          name='Event'
          component={EventScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name='EventCreate'
          component={EventCreateScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
<<<<<<< HEAD
          name='Filters'
          component={FiltersScreen}
=======
          name='GroupsView'
          component={AllGroupView}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name='CreateGroup'
          component={CreateGroup}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name='Group'
          component={GroupScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name='AllUsersView'
          component={AllUserView}
>>>>>>> 1b44c8731032407ba23ca7280fdb8bf5f1b6efca
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
