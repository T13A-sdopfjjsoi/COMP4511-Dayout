import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

const SignUpInput = ({
  label,
  value,
  onChangeText,
  secureTextEntry,
  children,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        theme={{ roundness: 25 }}
        style={styles.inputfield}
        label={label}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  inputfield: {
    overflow: "hidden",
    borderStyle: "solid",
    borderColor: "black",
    borderRadius: 25,
  },
});

export default SignUpInput;
