import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import UIStyles from "./styles.js";
import DashGrid from "./Components/DashGrid.js";
import StoreService from "../services/StoreService.js";
import { LinearGradient } from "expo-linear-gradient";

const Home = () => {
  const [user, setUser] = useState('')
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await StoreService.getActive();
      setUser(user);
    };

    fetchUser();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {!user ? (
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
              Please
            </Text>
            <View style={UIStyles.buttonContainer}>
            <Button
              mode='contained'
              title='Login'
              textColor="#63519f"
              buttonColor="white"
              style={UIStyles.button}
              onPress={() => {
                navigation.navigate("Login");
              }}>
              Log in
            </Button>
            <Text style={UIStyles.titleText}>or  </Text>
            <Button
              mode='contained'
              title='Sign up'
              textColor="#63519f"
              buttonColor="white"
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
              Welcome back
            </Text>
            <Text
              style={{
                fontSize: 30,
                color: "#ffffff",
                textDecorationLine: "underline",
              }}>
              {user.username}
            </Text>
          </View>
        </LinearGradient>
      )}

      <View style={UIStyles.dashContent}>
        <DashGrid />
      </View>
    </View>
  );
};

export default Home;
