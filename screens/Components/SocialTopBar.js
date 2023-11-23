import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import UIStyles from "../styles.js";

const SocialTopBar = ({ ActiveUser }) => {
  const navigation = useNavigation();
  return (
    <>
      {!ActiveUser?.username ? (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#9f78f0", "#9d76bb"]}>
          <View
            style={{
              paddingTop: 60,
              padding: 20,
              width: "100%",
            }}>
            <Text
              style={{ fontSize: 30, color: "#ffffff", fontWeight: "bold" }}>
              Welcome!
            </Text>
            <View style={UIStyles.buttonContainer}>
              <Button
                mode='contained'
                title='Login'
                style={UIStyles.button}
                onPress={() => {
                  navigation.navigate("Login");
                }}>
                Log in
              </Button>
              <Text style={UIStyles.titleText}>or </Text>
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
          </View>
        </LinearGradient>
      ) : (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#9f78f0", "#9d76bb"]}>
          <View
            style={{
              paddingTop: 60,
              padding: 20,
            }}>
            <Text
              style={{ fontSize: 30, color: "#ffffff", fontWeight: "bold" }}>
              Social Your Way
            </Text>
            <Text
              style={{
                fontSize: 30,
                color: "#ffffff",
                textDecorationLine: "underline",
              }}>
              {ActiveUser.username}
            </Text>
          </View>
        </LinearGradient>
      )}
    </>
  );
};

export default SocialTopBar;
