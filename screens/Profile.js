import React from "react";
import { View, Text } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import StoreService from "../services/StoreService";

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
      <Button
        mode='contained'
        title='Create Event'
        buttonColor="red"
        style={{margin:10}}
        onPress={() => {
          StoreService.clearAllData()
        }}>
        Clear all Data
      </Button>
    </View>
  );
};

export default Profile;
