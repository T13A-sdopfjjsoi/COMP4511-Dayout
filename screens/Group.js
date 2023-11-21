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
import { MaterialIcons } from "@expo/vector-icons";
import ActivitiesTypes from "../data/ActivitiesType.json";

const Group = ({ route, navigation, navigation: { goBack } }) => {
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

  const [selectmodelvisible, setSelectmodelvisible] = useState(false);
  const [checkViewvisiable, setCheckViewvisiable] = useState(false);

  const showselectDialog = () => setSelectmodelvisible(true);
  const showcheckDialog = () => setCheckViewvisiable(true);

  const hideselectDialog = async () => {
    if (activity === "") {
      console.log("No activity selected");
      setSelectmodelvisible(false);
      return;
    }
    const Groupdetail = await StoreService.getGroup(id);
    console.log(Groupdetail);
    setSelectmodelvisible(false);
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

  const hidecheckDialog = () => {
    setCheckViewvisiable(false);
  };

  const AddnewActivity = () => {
    setCheckViewvisiable(false);
    setSelectmodelvisible(true);
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
            <TouchableOpacity onPress={() => goBack()}>
              <MaterialIcons name='arrow-back' size={30} />
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
                visible={selectmodelvisible}
                onDismiss={hideselectDialog}
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
                  <Button onPress={hideselectDialog}>Done</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
            <Portal>
              <Dialog
                visible={checkViewvisiable}
                onDismiss={hidecheckDialog}
                style={{ maxHeight: "50%" }}>
                <Dialog.Title>Activities</Dialog.Title>
                {!group.datemarked ? (
                  <View>
                    <Text>NO activity</Text>
                    <Text>{group.datemarked || `date`}</Text>
                  </View>
                ) : (
                  <Dialog.ScrollArea>
                    <ScrollView
                      contentContainerStyle={{ paddingHorizontal: 24 }}>
                      {group.datemarked[selected]?.dots?.map(
                        (activity, idx) => (
                          <View key={idx}>
                            <Text variant='titleLarge'>{activity.key}</Text>
                          </View>
                        )
                      )}
                    </ScrollView>
                  </Dialog.ScrollArea>
                )}

                <Dialog.Actions>
                  <Button onPress={AddnewActivity}>Add</Button>
                  <Button onPress={hidecheckDialog}>Done</Button>
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
                  {
                    group.datemarked[selected]?.dots?.length === 0 ||
                    group.datemarked[selected]?.dots === undefined
                      ? showselectDialog(selected)
                      : showcheckDialog();
                  }
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
                  ...datesmarked,
                  [selected]: {
                    selected: true,
                    disableTouchEvent: true,
                    selectedDotColor: "orange",
                  },
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
        </View>
      </View>
    </PaperProvider>
  );
};

export default Group;
