import React from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";

const SignUpInput = ({
  label,
  value,
  onChangeText,
  secureTextEntry,
  children,
}) => {
  return (
    <View style={{ marginBottom: 20 }}>
      <TextInput
        theme={{ roundness: 25 }}
        style={{
          overflow: "hidden",
          borderStyle: "solid",
          borderColor: "black",
          borderRadius: 25,
        }}
        label={label}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
      {children}
    </View>
  );
};

export default SignUpInput;
