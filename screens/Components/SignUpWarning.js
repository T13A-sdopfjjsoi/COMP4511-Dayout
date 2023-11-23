import React from "react";
import { Dialog, Portal, Button, Text } from "react-native-paper";

const SignUpWarning = ({ name, email, password, visible, hideDialog }) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Error</Dialog.Title>
        <Dialog.Content>
          <Text variant='bodyMedium'>
            {name === "" || email === "" || password === ""
              ? "Please enter all the fields"
              : "Email already exists, please use another email!"}
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>OK</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default SignUpWarning;
