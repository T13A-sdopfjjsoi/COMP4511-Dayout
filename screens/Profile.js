import React from "react";
import { View, Text } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}>
      <Text>Profile</Text>
      <Button
        mode='contained'
        title='Create Event'
        onPress={() => {
          navigation.navigate("EventCreate");
        }}>
        Create Event +
      </Button>
    </View>
  );
};

export default Profile;
