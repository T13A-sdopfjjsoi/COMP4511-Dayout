import React, { useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Button, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import UIStyles from "./styles.js";
import StoreService from "../services/StoreService.js";

const Social = () => {
  const navigation = useNavigation();

  const [user, setUser] = useState(null);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const LoggedUser = await StoreService.getActive();

      setUser(LoggedUser);

      const allGroups = await StoreService.getAllGroups();

      setGroups(
        allGroups.filter((group) => group.members.includes(LoggedUser.username))
      );
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Your logic here to handle the changes in allGroups
    console.log("Groups have been updated in Social:", groups);
    setGroups(groups);
  }, [groups]);

  // const [groups, setGroups] = useState([
  //   { name: "Group 1", id: 1, members: ["person1", "person2", "person3"] },
  //   { name: "Group 2", id: 2, members: ["person1", "person2", "person3"] },
  //   { name: "Group 3", id: 3, members: ["person1", "person2", "person3"] },
  //   { name: "Group 4", id: 4, members: ["person1", "person2", "person3"] },
  //   { name: "Group 5", id: 5, members: ["person1", "person2", "person3"] },
  //   { name: "Group 6", id: 6, members: ["person1", "person2", "person3"] },
  //   { name: "Group 7", id: 7, members: ["person1", "person2", "person3"] },
  //   { name: "Group 8", id: 8, members: ["person1", "person2", "person3"] },
  //   { name: "Group 9", id: 9, members: ["person1", "person2", "person3"] },
  //   { name: "Group 10", id: 10, members: ["person1", "person2", "person3"] },
  // ]);

  const [friends, setFriends] = useState(["friend1", "friend2", "friend3"]);

  return (
    <View style={{ flex: 1 }}>
      {!user?.username ? (
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
            {user.username}
          </Text>
        </View>
      )}
      <View style={UIStyles.dashContent}>
        {!user ? (
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
              }}>
              <Text variant='titleLarge'>Groups</Text>
              <Button onPress={() => navigation.navigate("GroupsView", user)}>
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

      {!user ? (
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
              <Button>+ Add Friend</Button>
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
                {friends.map((friend) => (
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
                      <Button onPress={() => navigation.navigate("addfriend")}>
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
