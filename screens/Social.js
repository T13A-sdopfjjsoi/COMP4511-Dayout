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
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const LoggedUser = await StoreService.getActive();

      setUser(LoggedUser);

      const allGroups = await StoreService.getAllGroups();

      setGroups(
        allGroups.filter((group) => group.members.includes(LoggedUser.username))
      );

      const allFriends = await StoreService.getUser(LoggedUser.email);

      setFriends(allFriends.friends || []);
    };

    fetchData();
  }, []);

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
              <Button onPress={() => navigation.navigate("AllUsersView")}>
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
                      <Button
                        onPress={() => navigation.navigate("AllUsersView")}>
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
