import React from "react";
import { View, Text } from "react-native";
import Back from "./Components/Back"
import { useRoute } from '@react-navigation/native';


const EventScreen = () => {
  const route = useRoute();
  const eventId = route.params?.eventId;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        margin: "10%",
      }}>
      <Back />
      <Text>Event {eventId && (", was given ID "+ eventId)}</Text>
    </View>
  );
};

export default EventScreen;
