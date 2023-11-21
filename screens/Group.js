import React, { useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import {
  Button,
  Dialog,
  Modal,
  PaperProvider,
  Portal,
  Text,
} from "react-native-paper";
import StoreService from "../services/StoreService";
import UIStyles from "./styles.js";
import { Calendar } from "react-native-calendars";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ActivitiesTypes from "../data/ActivitiesType.json";

// List type of activities
const vacation = { key: "vacation", color: "red", selectedDotColor: "blue" };
const massage = { key: "massage", color: "blue", selectedDotColor: "blue" };
const workout = { key: "workout", color: "green" };

const Group = ({ route, navigation }) => {
  const { id } = route.params ?? {};
  const [group, setGroup] = useState({});
  const [selected, setSelected] = useState("");
  const [ActiveUser, setActiveUser] = useState({});
  const [activity, setActivity] = useState("");
  const [datesmarked, setDatesmarked] = useState({});

  useEffect(() => {
    const getGroupdetail = async () => {
      const groupdetail = await StoreService.getGroup(id);
      console.log(groupdetail);
      console.log(groupdetail.members);
      setDatesmarked(groupdetail.datemarked);
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

  const LeaveGroup = async () => {
    try {
      // Get the user's data
      const Groupdetail = await StoreService.getGroup(id);

      // Update the friends array
      const updatedMembers = Groupdetail.members.filter(
        (member) => member !== ActiveUser.username
      );

      // Update the user's data on the backend
      await StoreService.updateGroup(Groupdetail.id, {
        ...Groupdetail,
        members: updatedMembers,
      });

      updateGroupDetail();
      navigation.navigate("Social");
    } catch (error) {
      console.error("Error updating group status:", error);
    }
  };

  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = async () => {
    if (activity === "") {
      console.log("No activity selected");
      setVisible(false);
      return;
    }
    const Groupdetail = await StoreService.getGroup(id);
    console.log(Groupdetail);
    setVisible(false);
    console.log(activity);
    console.log(Groupdetail.datemarked);
    const prevdate = Groupdetail.datemarked[selected]?.dots || [];
    const newdate = {
      [selected]: {
        dots: [...prevdate, ActivitiesTypes[activity]],
      },
    };
    console.log({ ...prevdate, ...newdate });

    await StoreService.updateGroup(Groupdetail.id, {
      ...Groupdetail,
      datemarked: { ...Groupdetail.datemarked, ...newdate },
    });
    setDatesmarked({ ...Groupdetail.datemarked, ...newdate });
    setActivity("");
    updateGroupDetail();
  };

  return (
    <PaperProvider>
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
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text
              style={[UIStyles.titleText, { textDecorationLine: "underline" }]}>
              {group.name}
            </Text>
            <Button onPress={() => LeaveGroup()}>Leave Group</Button>
          </View>
        </View>
        <View style={{ margin: 20 }}>
          <Portal>
            <Portal>
              <Dialog
                visible={visible}
                onDismiss={hideDialog}
                style={{ maxHeight: "50%" }}>
                <Dialog.Title>Add Activity</Dialog.Title>
                <Dialog.ScrollArea>
                  <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
                    {Object.keys(ActivitiesTypes).map((activity) => (
                      <TouchableOpacity
                        key={activity}
                        style={{
                          backgroundColor: "#bdbdbd",
                          margin: 5,
                          padding: 5,
                          borderRadius: 15,
                        }}
                        onPress={() => setActivity(activity)}>
                        <Text variant='titleLarge'>{activity}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </Dialog.ScrollArea>
                <Dialog.Actions>
                  <Button onPress={hideDialog}>Done</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </Portal>
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                margin: 5,
              }}>
              <Text variant='titleLarge'>Calendar</Text>
              <Button
                mode='contained'
                disabled={selected === ""}
                onPress={() => {
                  showDialog();
                }}>
                Add Activity
              </Button>
            </View>
            <View>
              <Calendar
                onDayPress={(day) => {
                  console.log("CLICKED DAY", day);
                  setSelected(day.dateString);
                }}
                markingType={"multi-dot"}
                markedDates={{
                  [selected]: {
                    selected: true,
                    disableTouchEvent: true,
                    selectedDotColor: "orange",
                  },
                  ...datesmarked,
                }}
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
                .map((member) => (
                  <View
                    key={member}
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
        </View>
      </View>
    </PaperProvider>
  );
};

export default Group;
