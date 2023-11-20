import React, { useCallback, useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Button, Text } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import UIStyles from "./styles.js";
import StoreService from "../services/StoreService.js";

const Social = ({ route }) => {
  const { screen } = route.params;
  const navigation = useNavigation();
  const [currentusername, setCurrentUsername] = useState("");
  const [ActiveUser, setActiveUser] = useState(null);
  const [groups, setGroups] = useState([]);
  const [friends, setFriends] = useState([]);

  const fetchData = async () => {
    const LoggedUser = await StoreService.getActive();

    setCurrentUsername(LoggedUser.username);

    const allGroups = await StoreService.getAllGroups();

    setGroups(
      allGroups.filter((group) => group.members.includes(currentusername))
    );

    const allFriends = await StoreService.getUser(LoggedUser.email);

    setFriends(allFriends.friends || []);
  };

  const updateActiveUser = async () => {
    const LoggedUser = await StoreService.getActive();
    const Userdetail = await StoreService.getUser(LoggedUser.email);
    setActiveUser(Userdetail);
    setFriends(Userdetail.friends || []);
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
      updateActiveUser();
    }, [])
  );

  const RemoveFriend = async (username) => {
    try {
      // Get the user's data
      const LoggedUser = await StoreService.getUser(ActiveUser.email);

      // Update the friends array
      const updatedFriends = LoggedUser.friends.filter(
        (friend) => friend !== username
      );

      // Update the user's data on the backend
      await StoreService.updateUser(LoggedUser.username, {
        ...LoggedUser,
        friends: updatedFriends,
      });

      const status = await StoreService.assignActive(LoggedUser.email);

      if (status) {
        updateActiveUser();
      }
    } catch (error) {
      console.error("Error updating friend status:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {!ActiveUser?.username ? (
        <View style={UIStyles.header}>
          <Text style={[UIStyles.titleText, { fontWeight: "bold" }]}>
            Welcome!
          </Text>
          <View style={UIStyles.buttonContainer}>
            <Button
              mode='contained'
              title='Login'
              style={UIStyles.button}
              onPress={() => {
                navigation.navigate("Login");
              }}>
              Log in
            </Button>
            <Text style={UIStyles.titleText}>or </Text>
            <Button
              mode='contained'
              title='Sign up'
              style={UIStyles.button}
              onPress={() => {
                navigation.navigate("Signup");
              }}>
              Sign up
            </Button>
          </View>
        </View>
      ) : (
        <View style={UIStyles.header}>
          <Text style={[UIStyles.titleText, { fontWeight: "bold" }]}>
            Social Your Way
          </Text>
          <Text
            style={[UIStyles.titleText, { textDecorationLine: "underline" }]}>
            {ActiveUser.username}
          </Text>
        </View>
      )}
      <View style={UIStyles.dashContent}>
        {!ActiveUser ? (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text>Please login to continue</Text>
          </View>
        ) : (
          <ScrollView style={{ marginBottom: 10 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginRight: 5,
              }}>
              <Text variant='titleLarge'>Groups</Text>
              <Button
                onPress={() => navigation.navigate("GroupsView", user)}
                mode='contained'>
                + Join Group
              </Button>
            </View>
            {/* // If groups is empty array, show nothing, else show list of groups
          available */}
            {groups.length === 0 ? (
              // Render this when groups is an empty array
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text>Join a group</Text>
              </View>
            ) : (
              // Render this when groups is not an empty array
              <ScrollView
                horizontal={true}
                contentContainerStyle={{ flexGrow: 1, marginBottom: 10 }}>
                {groups.map((group) => (
                  <TouchableOpacity
                    key={group.id}
                    mode='contained'
                    style={{
                      width: 150,
                      height: 150,
                      backgroundColor: "yellow",
                      margin: 5,
                      borderRadius: 15,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onPress={() =>
                      navigation.navigate("Group", { id: group.id })
                    }>
                    <Text>{group.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </ScrollView>
        )}
      </View>

      {!ActiveUser ? (
        <></>
      ) : (
        <View style={{ flex: 1, margin: 10 }}>
          <ScrollView>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
              <Text variant='titleLarge'>Friends</Text>
              <Button
                onPress={() =>
                  navigation.navigate("AllUsersView", { screen: true })
                }>
                + Add Friend
              </Button>
            </View>
            {/* // If friends is empty array, show nothing, else show list of friends */}
            {friends.length === 0 ? (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text>Add a friend</Text>
              </View>
            ) : (
              <ScrollView
                contentContainerStyle={{
                  flexGrow: 1,
                  marginBottom: 10,
                  margin: "5%",
                }}>
                {friends?.map((friend) => (
                  <TouchableOpacity
                    key={friend}
                    mode='contained'
                    style={{}}
                    onPress={() => {}}>
                    <View
                      style={{
                        height: 50,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}>
                      <Text variant='titleMedium'>{friend}</Text>
                      <Button onPress={() => RemoveFriend(friend)}>
                        Remove
                      </Button>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default Social;
