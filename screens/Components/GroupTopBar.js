import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Button, Text } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import UIStyles from "../styles.js";

const GroupTopBar = ({ goBack, group, LeaveGroup }) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={["#9f78f0", "#9d76bb"]}>
      <View
        style={{
          paddingTop: 60,
          padding: 20,
          width: "100%",
        }}>
        <View style={{ alignItems: "flex-start" }}>
          <TouchableOpacity onPress={() => goBack()}>
            <MaterialIcons name='arrow-back' size={30} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={[UIStyles.titleText, { textDecorationLine: "underline" }]}>
            {group.name}
          </Text>
          <Button
            buttonColor='red'
            textColor='white'
            onPress={() => LeaveGroup()}>
            Leave Group
          </Button>
        </View>
      </View>
    </LinearGradient>
  );
};

export default GroupTopBar;
