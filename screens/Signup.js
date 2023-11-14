import React, { useState } from "react";
import { View, Text } from "react-native";
import { Button, TextInput } from "react-native-paper";
import Back from "./Components/Back.js";


const Signup = ({ route, navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        margin: "10%",
      }}>
      <Back />
      <View style={{ alignItems: "center" }}>
        <Text>Create an Account</Text>
      </View>
      <View>
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
        <Button
          mode='contained'
          onPress={() =>
            navigation.navigate("Home", {
              method: "signup",
              name: name,
              email: email,
              password: password,
            })
          }>
          Sign up
        </Button>
      </View>
    </View>
  );
};

export default Signup;
