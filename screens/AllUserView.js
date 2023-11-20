import React, { useEffect, useState } from "react";
import WelcomeBackground from "./Components/WelcomeBackground";
import { View, TouchableOpacity } from "react-native";
import { Button, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StoreService from "../services/StoreService";

const AllUserView = ({ route, navigation, navigation: { goBack } }) => {
  const { screen } = route.params;
  const [users, setUsers] = useState([]);
  const [ActiveUser, setActiveUser] = useState({});
  const [Activeusername, setActiveusername] = useState("");

  const fetchData = async () => {
    try {
      const allUsers = await StoreService.getAllUsers();
      const LoggedUser = await StoreService.getActive();
      console.log("AWDAWDAWD");
      setActiveusername(LoggedUser.username);
      setUsers(allUsers.filter((user) => user.username !== Activeusername));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateActiveUser = async () => {
    const LoggedUser = await StoreService.getActive();
    const Userdetail = await StoreService.getUser(LoggedUser.email);
    setActiveUser(Userdetail);
  };

  useEffect(() => {
    fetchData();
    updateActiveUser();
  }, []);

  const handleAddFriend = async (username) => {
    try {
      // Get the user's data
      const LoggedUser = await StoreService.getUser(ActiveUser.email);

      // Update the friends array
      const updatedFriends = [...LoggedUser.friends, username];

      // Update the user's data on the backend
      await StoreService.updateUser(LoggedUser.username, {
        ...LoggedUser,
        friends: updatedFriends,
      });

      const status = await StoreService.assignActive(LoggedUser.email);

      if (status) {
        // setActiveUser(LoggedUser);
        updateActiveUser();
      }
    } catch (error) {
      console.error("Error updating friend status:", error);
    }
  };

  return (
    <WelcomeBackground>
      <View
        style={{
          height: "100%",
          margin: "10%",
        }}>
        <View style={{ alignItems: "flex-end" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Social", { screen: false })}>
            <MaterialCommunityIcons name='home' size={30} />
          </TouchableOpacity>
        </View>
        {users.map((user) => (
          <View key={user.username}>
            <TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: 50,
                  backgroundColor: "white",
                  borderRadius: 10,
                  padding: 5,
                  margin: 5,
                }}>
                <Text>{user.username}</Text>
                <Button
                  icon='plus'
                  mode='contained'
                  disabled={(ActiveUser.friends || []).includes(user.username)}
                  onPress={() => handleAddFriend(user.username)}>
                  {(ActiveUser.friends || []).includes(user.username)
                    ? "Friend Added"
                    : "Add Friend"}
                </Button>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </WelcomeBackground>
  );
};

export default AllUserView;
