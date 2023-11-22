import React from "react";
import { Dialog, Portal, Button, Text } from "react-native-paper";

const LoginWarning = ({ visible, hideDialog }) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Error</Dialog.Title>
        <Dialog.Content>
          <Text variant='bodyMedium'>
            Invalid login detail. Please ensure you entered correct
            email/password.
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>OK</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default LoginWarning;
