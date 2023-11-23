import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import StoreService from "../services/StoreService";
import LoginSignup from "./Components/LoginSignup";

const Profile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState('')

  
  useEffect(() => {
    const fetchUser = async () => {
      const user = await StoreService.getActive();
      setUser(user);
    };

    fetchUser();
  }, []);

  const reload = () => {
    const fetchUser = async () => {
      const user = await StoreService.getActive();
      setUser(user);
    };

    fetchUser();
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}>

{!user ? (
        <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}>
            <LoginSignup />         
        </View>
      ) : (
        <>
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
          StoreService.removeActive(),
          reload()

        }}>
        Log Out
      </Button>
      </>
      )}
    </View>
  );
};

export default Profile;
