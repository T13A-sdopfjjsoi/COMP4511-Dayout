import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  MaterialCommunityIcons,
  Octicons,
  FontAwesome,
} from "@expo/vector-icons";
import SearchScreen from "./Search";
import ForyouScreen from "./Foryou";
import SocialScreen from "./Social";
import ProfileScreen from "./Profile";
import HomeScreen from "./Home";

const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='home' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='Search'
        component={SearchScreen}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='magnify' color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name='For you'
        component={ForyouScreen}
        options={{
          tabBarLabel: "For you",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='star-outline'
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Social'
        component={SocialScreen}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarLabel: "Social",
          tabBarIcon: ({ color, size }) => (
            <Octicons name='people' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name='user-circle-o' color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
