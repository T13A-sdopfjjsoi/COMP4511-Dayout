import React from "react";
import { ScrollView, View } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

const GroupCheckActivitiesDialog = ({
  checkViewvisiable,
  hidecheckDialog,
  group,
  AddnewActivity,
  selected,
}) => {
  return (
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
            <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
              {group.datemarked[selected]?.dots?.map((activity, idx) => (
                <View key={idx}>
                  <Text variant='titleLarge'>{activity}</Text>
                </View>
              ))}
            </ScrollView>
          </Dialog.ScrollArea>
        )}

        <Dialog.Actions>
          <Button onPress={AddnewActivity}>Add</Button>
          <Button onPress={hidecheckDialog}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default GroupCheckActivitiesDialog;
