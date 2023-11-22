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
import WelcomeBackground from "./Components/WelcomeBackground";

const Signup = ({ route, navigation, navigation: { goBack } }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const SignUpSubmit = async () => {
    if (name === "" || email === "" || password === "") {
      console.log("empty field");
      showDialog();
      return;
    }
    const ExistUser = await StoreService.getUser(email);
    if (ExistUser === null) {
      console.log("pass");

      const AddUserStatus = await StoreService.addUser({
        username: name,
        email: email,
        password: password,
        interest: [],
        friends: [],
      });
      const LoggedUser = await StoreService.assignActive(email);
      if (AddUserStatus && LoggedUser) {
        navigation.navigate("Interests", {
          method: "signup",
          username: name,
          email: email,
          password: password,
        });
      }
    } else {
      console.log("Same user email found");
      showDialog();
      return;
    }
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
          </View>
          <View>
            <Portal>
              <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>Error</Dialog.Title>
                <Dialog.Content>
                  <Text variant='bodyMedium'>
                    {name === "" || email === "" || password === ""
                      ? "Please enter all the fields"
                      : "Email already exists, please use another email!"}
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
            <View style={{ alignItems: "center" }}>
              <Text
                variant='displaySmall'
                style={{ color: "white", fontWeight: "bold" }}>
                Create Account
              </Text>
            </View>
            <View style={{ margin: "5%" }}>
              <View style={{ marginBottom: 20 }}>
                <TextInput
                  theme={{ roundness: 25 }}
                  style={{
                    overflow: "hidden",
                    borderStyle: "solid",
                    borderColor: "black",
                    borderRadius: 25,
                  }}
                  label='Name'
                  value={name}
                  onChangeText={(name) => setName(name)}
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
                <Button mode='contained' onPress={() => SignUpSubmit()}>
                  Sign up
                </Button>
              </View>
            </View>
          </View>
        </View>
      </WelcomeBackground>
    </PaperProvider>
  );
};

export default Signup;
