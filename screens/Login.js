import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Button, HelperText, PaperProvider, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StoreService from "../services/StoreService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WelcomeBackground from "./Components/WelcomeBackground";
import SignUpInput from "./Components/SignUpInput";
import LoginWarning from "./Components/LoginWarning";
import AuthContainer from "./Components/AuthContainer";

const Login = ({ navigation, navigation: { goBack } }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const LoginSubmit = async () => {
    // Error handling
    const ExistUser = await StoreService.getUser(email);
    if (ExistUser === null) {
      console.log("User not found");
      showDialog();
      return;
    }

    // Check password
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

  const hasErrors = () => {
    return !email.includes("@");
  };

  return (
    <PaperProvider>
      <WelcomeBackground>
        <View style={styles.container}>
          <View style={styles.topbutton}>
            <TouchableOpacity onPress={() => goBack()}>
              <MaterialCommunityIcons name='home' size={30} />
            </TouchableOpacity>
            {/* <Button onPress={() => clearAsyncStorage()}>
              <Text>Clear Async Storage</Text>
            </Button> */}
          </View>
          <View>
            <LoginWarning visible={visible} hideDialog={hideDialog} />
          </View>
          <AuthContainer title='Log In'>
            <SignUpInput
              label='Email'
              value={email}
              onChangeText={(email) => setEmail(email)}>
              {email.includes("@") || email === "" ? null : (
                <HelperText type='error' visible={hasErrors()}>
                  Email address is invalid!
                </HelperText>
              )}
            </SignUpInput>
            <SignUpInput
              label='Password'
              value={password}
              onChangeText={(password) => setPassword(password)}
              secureTextEntry={true}></SignUpInput>
            <View>
              <Button mode='contained' onPress={() => LoginSubmit()}>
                Log In
              </Button>
            </View>
          </AuthContainer>
        </View>
      </WelcomeBackground>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    margin: "10%",
  },
  topbutton: {
    alignItems: "flex-end",
  },
});

export default Login;
