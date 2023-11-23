import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import ActivitiesTypes from "../../data/ActivitiesType.json";
import SignUpInput from "./SignUpInput";

const GroupAddActivitiesDialog = ({
  selectmodelvisible,
  hideselectDialog,
  activity,
  setActivity,
}) => {
  return (
    <Portal>
      <Dialog
        visible={selectmodelvisible}
        onDismiss={hideselectDialog}
        style={{ maxHeight: "50%" }}>
        <Dialog.Title>Add Activity</Dialog.Title>
        <SignUpInput
          label='Activity'
          value={activity}
          onChangeText={setActivity}
        />
        {/* <Dialog.ScrollArea>
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
        </Dialog.ScrollArea> */}
        <Dialog.Actions>
          <Button onPress={hideselectDialog}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default GroupAddActivitiesDialog;
