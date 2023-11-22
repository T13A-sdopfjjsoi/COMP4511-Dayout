import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import {
  Button,
  Dialog,
  Portal,
  PaperProvider,
  Text,
  TextInput,
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StoreService from "../services/StoreService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WelcomeBackground from "./Components/WelcomeBackground";

const Login = ({ route, navigation, navigation: { goBack } }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const LoginSubmit = async () => {
    const ExistUser = await StoreService.getUser(email);
    if (ExistUser === null) {
      console.log("User not found");
      showDialog();
      return;
    }
    if (ExistUser.password === password) {
      const LoggedUser = await StoreService.assignActive(email);
      if (ExistUser && LoggedUser) {
        navigation.navigate("Home", {
          method: "login",
          email: email,
          password: password,
        });
      }
    } else {
      console.log("Wrong password");
      showDialog();
      return;
    }
  };

  const clearAsyncStorage = async () => {
    AsyncStorage.clear();
    console.log("Clear Storage");
  };

  return (
    <PaperProvider>
      <WelcomeBackground>
        <View
          style={{
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
          <View>
            <Portal>
              <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>Error</Dialog.Title>
                <Dialog.Content>
                  <Text variant='bodyMedium'>
                    Invalid login detail. Please ensure you entered correct
                    email/password.
                  </Text>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={hideDialog}>OK</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
            }}>
            <View style={{ alignItems: "center", margin: "10%" }}>
              <Text
                variant='displaySmall'
                style={{ color: "white", fontWeight: "bold" }}>
                Log In
              </Text>
            </View>
            <View
              style={{
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
      </WelcomeBackground>
    </PaperProvider>
  );
};

export default Login;
