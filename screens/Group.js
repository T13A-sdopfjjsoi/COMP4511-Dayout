import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { PaperProvider, Portal } from "react-native-paper";
import StoreService from "../services/StoreService";
import ActivitiesTypes from "../data/ActivitiesType.json";
import GroupAddActivitiesDialog from "./Components/GroupAddActivitiesDialog.js";
import GroupCheckActivitiesDialog from "./Components/GroupCheckActivitiesDialog.js";
import GroupMemberView from "./Components/GroupMemberView.js";
import GroupCalendarView from "./Components/GroupCalendarView.js";
import GroupTopBar from "./Components/GroupTopBar.js";

const Group = ({ route, navigation, navigation: { goBack } }) => {
  const { id } = route.params ?? {};
  const [group, setGroup] = useState({});
  const [selected, setSelected] = useState("");
  const [ActiveUser, setActiveUser] = useState({});
  const [activity, setActivity] = useState("");
  const [datesmarked, setDatesmarked] = useState({});
  const [selectmodelvisible, setSelectmodelvisible] = useState(false);
  const [checkViewvisiable, setCheckViewvisiable] = useState(false);

  const showselectDialog = () => setSelectmodelvisible(true);
  const showcheckDialog = () => setCheckViewvisiable(true);

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
    if (Groupdetail.datemarked === undefined) {
      console.log("datemarked is undefined");
      await StoreService.updateGroup(Groupdetail.id, {
        ...Groupdetail,
        datemarked: {
          [selected]: {
            dots: [activity],
          },
        },
      });
      setDatesmarked({
        [selected]: {
          dots: [activity],
        },
      });
      setActivity("");
      updateGroupDetail();
      return;
    }
    const prevdate = Groupdetail.datemarked[selected]?.dots || [];
    const newdate = {
      [selected]: {
        dots: [...prevdate, activity],
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
        <GroupTopBar group={group} LeaveGroup={LeaveGroup} goBack={goBack} />
        <View style={{ margin: 20 }}>
          <Portal>
            <GroupAddActivitiesDialog
              selectmodelvisible={selectmodelvisible}
              hideselectDialog={hideselectDialog}
              activity={activity}
              setActivity={setActivity}
            />

            <GroupCheckActivitiesDialog
              checkViewvisiable={checkViewvisiable}
              hidecheckDialog={hidecheckDialog}
              group={group}
              AddnewActivity={AddnewActivity}
              selected={selected}
            />
          </Portal>
          <GroupCalendarView
            group={group}
            selected={selected}
            setSelected={setSelected}
            showselectDialog={showselectDialog}
            showcheckDialog={showcheckDialog}
            datesmarked={datesmarked}
          />
          <GroupMemberView
            group={group}
            ActiveUser={ActiveUser}
            RemoveMember={RemoveMember}
          />
        </View>
      </View>
    </PaperProvider>
  );
};

export default Group;
