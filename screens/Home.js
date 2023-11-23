import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import UIStyles from "./styles.js";
import DashGrid from "./Components/DashGrid.js";
import StoreService from "../services/StoreService.js";

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
        <View style={UIStyles.header}>
          <Text style={[UIStyles.titleText, { fontWeight: 'bold' }]}>Welcome!</Text>
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
      ) : (
        <View style={UIStyles.header}>
          <Text style={[UIStyles.titleText, { fontWeight: 'bold' }]}>Welcome back</Text>
          <Text style={[UIStyles.titleText, { textDecorationLine: 'underline' }]}>{user.username}</Text>
        </View>
      )}

      <View style={UIStyles.dashContent}>
        <DashGrid />
      </View>
    </View>
  );
};

export default Home;
