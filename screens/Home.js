import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}>
      <Text>Home</Text>
      <Button
        mode='contained'
        title='Login'
        onPress={() => {
          navigation.navigate("Login");
        }}>
        Log in
      </Button>
      <Button
        mode='contained'
        title='Sign up'
        onPress={() => {
          navigation.navigate("Signup");
        }}>
        Sign up
      </Button>
    </View>
  );
};

export default Home;
