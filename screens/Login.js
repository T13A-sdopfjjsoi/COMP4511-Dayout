import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import StoreService from "../services/StoreService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ route, navigation, navigation: { goBack } }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const LoginSubmit = async () => {
    const ExistUser = await StoreService.getUser(email);
    if (ExistUser) {
      navigation.navigate("Home", {
        method: "login",
        email: email,
        password: password,
      });
    }
  };

  const clearAsyncStorage = async () => {
    AsyncStorage.clear();
    console.log("Clear Storage");
  };

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={["#9B57D0", "#9D76BB"]}
      style={{ flex: 1 }}>
      <View
        style={{
          // flex: 1,
          // justifyContent: "center",
          // backgroundColor: "blue",
          height: "100%",
          margin: "10%",
        }}>
        <View style={{ alignItems: "flex-end" }}>
          <TouchableOpacity onPress={() => goBack()}>
            <MaterialCommunityIcons name='home' size={30} />
          </TouchableOpacity>
          <Button onPress={() => clearAsyncStorage()}>
            <Text>Clear Async Storage</Text>
          </Button>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            // backgroundColor: "green",
          }}>
          <View style={{ alignItems: "center" }}>
            <Text>Log In</Text>
          </View>
          <View
            style={{
              // backgroundColor: "yellow",
              justifyContent: "center",
            }}>
            <View style={{ marginBottom: 20 }}>
              <TextInput
                theme={{ roundness: 25 }}
                style={{
                  overflow: "hidden",
                  borderStyle: "solid",
                  borderColor: "black",
                  borderRadius: 25,
                }}
                label='Email'
                value={email}
                onChangeText={(email) => setEmail(email)}
              />
            </View>
            <View style={{ marginBottom: 20 }}>
              <TextInput
                theme={{ roundness: 25 }}
                style={{
                  overflow: "hidden",
                  borderStyle: "solid",
                  borderColor: "black",
                  borderRadius: 25,
                }}
                label='Password'
                value={password}
                onChangeText={(password) => setPassword(password)}
                secureTextEntry={true}
              />
            </View>
            <View>
              <Button mode='contained' onPress={() => LoginSubmit()}>
                Log In
              </Button>
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Login;
