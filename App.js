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
import AllGroupView from "./screens/AllGroupView";
import CreateGroup from "./screens/CreateGroup";
import GroupScreen from "./screens/Group";
import AllUserView from "./screens/AllUserView";
import FiltersScreen from "./screens/Filters";
import EventTags from "./screens/EventTags";
import { enGB, registerTranslation } from 'react-native-paper-dates'
registerTranslation('en-GB', enGB)

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
          name='Filters'
          component={FiltersScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
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
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name='EventTags'
          component={EventTags}
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
