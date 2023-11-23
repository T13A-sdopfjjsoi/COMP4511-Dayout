import React, { useState, useEffect } from "react";
import { Button, View, Text, Image, Dimensions } from "react-native";
import Back from "./Components/Back"
import { useRoute } from '@react-navigation/native';
import UIStyles from "./styles.js";
import StoreService from "../services/StoreService";

const EventScreen = () => {
  const route = useRoute();
  const eventId = route.params?.eventId;
  const [event, setEvent] = useState({});
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getEvent();
    console.log(event);
  }, []);

  const getEvent = async () => {
    console.log(`Getting event: ${eventId}`);
    const event = await StoreService.getEvent(eventId);
    Object.keys(event).forEach((key) => console.log(key))
    if (event !== null) {
      console.log(event)
      setEvent(event);
      setTags(Object.values(event.tags)[0])
    } else {
      console.log("Event not found");
      return null;
    }
  };

  return (
    <View
      style={{
        marginLeft: "4%"
      }}>
      <Image
        style={{width: Dimensions.get('window').width, height: 150, left: "-5%"}}
        source={{
          uri: event.image,
        }}
      />
      <Back />
      <View
        style={{
          margin: "3%"
        }}
      >
        <Text>Event {eventId}</Text>
        <Text style={[UIStyles.titleText, { fontWeight: 'bold', color: "black" }]}>{event.name}</Text>
        {tags.map((tag) => (
          <Text>{tag}</Text>
        ))}
        <Text>Created by {event.creator}</Text>
        <Text>{event.description}</Text>
        <Text>Location: {event.location}</Text>
        <Text>Start: {event.start_time}</Text>
        <Text>End: {event.end_time}</Text>
      </View>



    </View>
  );
};

export default EventScreen;
