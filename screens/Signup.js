import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Signup = ({ route, navigation, navigation: { goBack } }) => {
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
      <View style={{ alignItems: "flex-end" }}>
        <TouchableOpacity onPress={() => goBack()}>
          <MaterialCommunityIcons name='home' size={30} />
        </TouchableOpacity>
      </View>
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
            navigation.navigate("Interests", {
              method: "signup",
              username: name,
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
