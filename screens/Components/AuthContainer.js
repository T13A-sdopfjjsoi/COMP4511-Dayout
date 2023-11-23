import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

const AuthContainer = ({ title, children }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
      }}>
      <View style={{ alignItems: "center" }}>
        <Text
          variant='displaySmall'
          style={{ color: "white", fontWeight: "bold" }}>
          {title}
        </Text>
      </View>
      <View style={{ margin: "5%" }}>{children}</View>
    </View>
  );
};

export default AuthContainer;
