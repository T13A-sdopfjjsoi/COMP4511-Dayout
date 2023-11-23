import React from "react";
import { ScrollView, View } from "react-native";
import { Button, Text } from "react-native-paper";

const GroupMemberView = ({ group, ActiveUser, RemoveMember }) => {
  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text variant='titleLarge'>Members</Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          marginBottom: 10,
          margin: "5%",
        }}>
        {group.members
          ?.sort((a, b) => {
            if (group.owner === a && group.owner !== b) {
              return -1;
            } else if (group.owner === b && group.owner !== a) {
              return 1;
            } else {
              return a.localeCompare(b);
            }
          })
          .map((member, idx) => (
            <View
              key={idx}
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
              <Text variant='titleMedium'>
                {group.owner === member ? member + " 👑" : member}
              </Text>
              <Button
                disabled={
                  member === ActiveUser.username || group.owner === member
                }
                onPress={() => RemoveMember(member)}>
                Remove
              </Button>
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

export default GroupMemberView;
