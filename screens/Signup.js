import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Button, HelperText, PaperProvider, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StoreService from "../services/StoreService";
import WelcomeBackground from "./Components/WelcomeBackground";
import SignUpWarning from "./Components/SignUpWarning";
import SignUpInput from "./Components/SignUpInput";
import AuthContainer from "./Components/AuthContainer";

const Signup = ({ navigation, navigation: { goBack } }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const SignUpSubmit = async () => {
    // Error handling
    if (name === "" || email === "" || password === "") {
      console.log("empty field");
      showDialog();
      return;
    }
    const ExistUser = await StoreService.getUser(email);

    // If user does not exist, add user to database
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

  const hasErrors = () => {
    return !email.includes("@");
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
            <SignUpWarning
              visible={visible}
              hideDialog={hideDialog}
              name={name}
              email={email}
              password={password}
            />
          </View>
          <AuthContainer title='Create Account'>
            <SignUpInput
              label='Name'
              value={name}
              onChangeText={(name) => setName(name)}></SignUpInput>
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
              <Button mode='contained' onPress={() => SignUpSubmit()}>
                Sign up
              </Button>
            </View>
          </AuthContainer>
        </View>
      </WelcomeBackground>
    </PaperProvider>
  );
};

export default Signup;
