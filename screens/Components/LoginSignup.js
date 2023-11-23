import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import UIStyles from "../styles.js";

const LoginSignup = () => {
  const navigation = useNavigation()

  return (
    <View
    style={{
      paddingTop: 60,
      padding: 20,
      width: "100%",
    }}>
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={["#9f78f0", "#9d76bb"]}
      style={{borderRadius:50}}>
    <View style={UIStyles.loginSignUp}>
      <Button
        mode='contained'
        title='Login'
        style={UIStyles.button}
        onPress={() => {
          navigation.navigate("Login");
        }}>
        Log in
      </Button>
      <Text style={{fontSize:18, color:"white"}}>or </Text>
      <Button
        mode='contained'
        title='Sign up'
        style={UIStyles.button}
        onPress={() => {
          navigation.navigate("Signup");
        }}>
        Sign up
      </Button>
    </View>
    </LinearGradient>
        </View>
  )
}

export default LoginSignup