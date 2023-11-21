import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Button, Text } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import UIStyles from "./styles.js";
import StoreService from "../services/StoreService.js";

const Social = () => {
  const navigation = useNavigation();
  const [currentusername, setCurrentUsername] = useState("");
  const [LoggedUser, setLoggedUser] = useState({});
  const [temp, setTemp] = useState({});
  const [ActiveUser, setActiveUser] = useState(null);
  const [groups, setGroups] = useState([]);
  const [friends, setFriends] = useState([]);

  const fetchData = async () => {
    console.log(
      "fetching data--------------------------------------------------------------"
    );

    console.log("LoggedUser", LoggedUser);

    setCurrentUsername(LoggedUser.username);

    const allGroups = await StoreService.getAllGroups();
    console.log("Mynameis", LoggedUser.username);
    console.log("Groupsss", allGroups);

    setGroups(
      allGroups.filter((group) => group.members.includes(LoggedUser.username))
    );

    const allFriends = await StoreService.getUser(LoggedUser.email);

    setFriends(allFriends.friends || []);
  };

  const updateActiveUser = async () => {
    console.log(
      "update active user-----------------------------------------------------"
    );
    const Userdetail = await StoreService.getUser(LoggedUser.email);
    setActiveUser(Userdetail);
    setFriends(Userdetail.friends || []);
  };

  useFocusEffect(
    useCallback(() => {
      const getuser = async () => {
        const user = await StoreService.getActive();
        setLoggedUser(user);
      };
      getuser();
    }, [])
  );

  useEffect(() => {
    (async () => {
      // updateScreen();
      console.log("Mid check", LoggedUser);
      if (Object.keys(LoggedUser).length > 0) {
        fetchData();
        updateActiveUser();
      }
    })();
  }, [LoggedUser]);

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
        <View
          style={{
            paddingTop: 60,
            padding: 20,
            backgroundColor: "red",
            width: "100%",
          }}>
          <Text style={{ fontSize: 30, color: "#ffffff", fontWeight: "bold" }}>
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
        <View
          style={{
            paddingTop: 60,
            padding: 20,
            backgroundColor: "red",
          }}>
          <Text style={{ fontSize: 30, color: "#ffffff", fontWeight: "bold" }}>
            Social Your Way
          </Text>
          <Text
            style={{
              fontSize: 30,
              color: "#ffffff",
              textDecorationLine: "underline",
            }}>
            {ActiveUser.username}
          </Text>
        </View>
      )}
      <View style={{ margin: 10 }}>
        {!ActiveUser ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}>
            <Text variant='displaySmall'>Please login to continue</Text>
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
                onPress={() => navigation.navigate("GroupsView", ActiveUser)}
                mode='contained'>
                + Join Group
              </Button>
            </View>
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
                {groups.map((group, idx) => (
                  <TouchableOpacity
                    key={group.id}
                    mode='contained'
                    style={{
                      width: 150,
                      height: 150,
                      margin: 5,
                      borderRadius: 15,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onPress={() =>
                      navigation.navigate("Group", { id: group.id })
                    }>
                    <ImageBackground
                      source={{ uri: `https://picsum.photos/7${idx}` }}
                      imageStyle={{ borderRadius: 15 }}
                      style={{
                        height: "100%",
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}>
                      <Text
                        style={{
                          color: "white",
                          fontSize: 24,
                          fontWeight: "bold",
                          textAlign: "center",
                          backgroundColor: "#000000a0",
                        }}>
                        {group.name}
                      </Text>
                    </ImageBackground>
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
                mode='contained'
                onPress={() => navigation.navigate("AllUsersView")}>
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
                  <TouchableOpacity key={friend} mode='contained'>
                    <View
                      style={{
                        height: 50,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "#bdbdbd",
                        borderRadius: 15,
                        padding: 5,
                        margin: 5,
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
