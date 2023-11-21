import React, { useState, useEffect } from "react";
import { Button, View, Text, Image, StyleSheet } from "react-native";
import Back from "./Components/Back"
import { useRoute } from '@react-navigation/native';
import StoreService from "../services/StoreService";

const EventScreen = () => {
  const route = useRoute();
  const eventId = route.params?.eventId;
  const [event, setEvent] = useState({});

  useEffect(() => {
    getEvent();
    console.log(event);
  }, []);

  const getEvent = async () => {
    console.log(`Getting event: ${eventId}`);
    const event = await StoreService.getEvent(eventId);
    if (event) {
      setEvent(event);
    } else {
      console.log("Event not found");
      return null;
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        margin: "10%",
      }}>
      <Back />
      <Text>Event {eventId}</Text>
      <Text>Created by {event.creator}</Text>
      <Text>{event.description}</Text>
      <Text>Location: {event.location}</Text>
      <Text>Start: {event.start_time}</Text>
      <Text>End: {event.end_time}</Text>
      <Text>Tags: {event.tags}</Text>
      <Text>Image URL: {event.image}</Text>
      <Image
        style={{width: 50, height: 50}}
        source={{
          uri: event.image,
        }}
      />
    </View>
  );
};

export default EventScreen;
