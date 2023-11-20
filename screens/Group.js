import React, { useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Button, Text } from "react-native-paper";
import StoreService from "../services/StoreService";
import UIStyles from "./styles.js";
import { Calendar } from "react-native-calendars";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const vacation = { key: "vacation", color: "red", selectedDotColor: "blue" };
const massage = { key: "massage", color: "blue", selectedDotColor: "blue" };
const workout = { key: "workout", color: "green" };

const Group = ({ route, navigation }) => {
  const { id } = route.params ?? {};
  const [group, setGroup] = useState({});
  const [selected, setSelected] = useState("");
  const [ActiveUser, setActiveUser] = useState({});
  const [datesmarked, setDatesmarked] = useState({
    "2023-11-25": {
      dots: [vacation, massage, workout],
    },
  });

  useEffect(() => {
    const getGroupdetail = async () => {
      const groupdetail = await StoreService.getGroup(id);
      console.log(groupdetail);
      console.log(groupdetail.members);
      setGroup(groupdetail); // Make sure groupdetail is not null
      const currentuser = await StoreService.getActive();
      setActiveUser(currentuser);
    };
    console.log("in group PageView");
    getGroupdetail();
  }, []);

  const updateGroupDetail = async () => {
    const newgroupdetail = await StoreService.getGroup(id);
    setGroup(newgroupdetail);
  };

  const RemoveMember = async (username) => {
    try {
      // Get the user's data
      const Groupdetail = await StoreService.getGroup(id);

      // Update the friends array
      const updatedMembers = Groupdetail.members.filter(
        (member) => member !== username
      );

      // Update the user's data on the backend
      await StoreService.updateGroup(Groupdetail.id, {
        ...Groupdetail,
        members: updatedMembers,
      });

      updateGroupDetail();
    } catch (error) {
      console.error("Error updating friend status:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          paddingTop: 60,
          padding: 20,
          backgroundColor: "red",
          width: "100%",
        }}>
        <View style={{ alignItems: "flex-start" }}>
          <TouchableOpacity onPress={() => navigation.navigate("Social")}>
            <MaterialCommunityIcons name='home' size={30} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={[UIStyles.titleText, { textDecorationLine: "underline" }]}>
            {group.name}
          </Text>
          <Button>Leave Group</Button>
        </View>
      </View>
      <View style={{ margin: 20 }}>
        <View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text variant='titleLarge'>Calendar</Text>
          </View>
          <View>
            <Calendar
              onDayPress={(day) => {}}
              markingType={"multi-dot"}
              markedDates={datesmarked}
            />
          </View>
        </View>
        <View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text variant='titleLarge'>Members</Text>
          </View>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              marginBottom: 10,
              margin: "5%",
            }}>
            {group.members?.map((member) => (
              <View
                key={member}
                style={{
                  height: 50,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                <Text variant='titleMedium'>{member}</Text>
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
      </View>
    </View>
  );
};

export default Group;
