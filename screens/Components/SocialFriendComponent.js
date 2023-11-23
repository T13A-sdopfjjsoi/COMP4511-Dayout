import React from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const SocialFriendComponent = ({ ActiveUser, friends, RemoveFriend }) => {
  const navigation = useNavigation();
  return (
    <>
      {!ActiveUser ? (
        <></>
      ) : (
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.top}>
              <Text variant='titleLarge'>Friends</Text>
              <Button
                mode='contained'
                onPress={() => navigation.navigate("AllUsersView")}>
                + Add Friend
              </Button>
            </View>
            {/* // If friends is empty array, show nothing, else show list of friends */}
            {friends.length === 0 ? (
              <View style={styles.addfriendbtn}>
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
                    <View style={styles.friendlist}>
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addfriendbtn: {
    justifyContent: "center",
    alignItems: "center",
  },
  friendlist: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 5,
    margin: 5,
  },
});

export default SocialFriendComponent;
