import React, { useState, useEffect } from "react";
import { View, Text, Image, Dimensions } from "react-native";
import Back from "./Components/Back"
import { Button } from "react-native-paper"
import { useRoute, useFocusEffect } from '@react-navigation/native';
import UIStyles from "./styles.js";
import StoreService from "../services/StoreService";

const EventScreen = () => {
  const route = useRoute();
  const eventId = route.params?.eventId;
  const [event, setEvent] = useState({});
  const [tags, setTags] = useState([]);
  const [user, setUser] = useState({});
  const [pageReload, setPageReload] = useState(0);

  useEffect(() => {
    getUser();
    getEvent();
    console.log(event);
  }, []);

  useEffect(() => {
    getEvent();
  }, [pageReload]);

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

  const getUser = async () => {
    const user = await StoreService.getActive();
    setUser(user);
  };

  const joinEvent = () => {
    console.log("Trying to add user");
    getUser();
    if (user.username == null) {
      console.log("No user found");
      return;
    }

    if (!event.users_going.includes(user.username)) {
      console.log("Updating going list");
      let newGoingList = event.users_going;
      newGoingList.push(user.username);
      setEvent(event => ({
        ...event,
        users_going: newGoingList
      }));
      updateEvent();
    } else {
      console.log("User already going")
    }
  }

  const addEventInterested = () => {
    console.log("Trying to add user");
    getUser();
    if (user.username == null) {
      console.log("No user found");
      return;
    }

    if (!event.users_interested.includes(user.username)) {
      console.log("Updating interested list");
      let newInterestedList = event.users_interested;
      newInterestedList.push(user.username);
      setEvent(event => ({
        ...event,
        users_interested: newInterestedList
      }));
      updateEvent();
    } else {
      console.log("User already interested")
    }
  }

  const updateEvent = async () => {
    const eventToUpdate = await StoreService.updateEvent(event.id, event);
    Object.keys(event).forEach((key) => console.log(key))
    if (eventToUpdate !== null) {
      console.log("Updated event");
      console.log(event);
    } else {
      console.log("Event not found");
    }
    setPageReload(pageReload + 1);
  };

  return (
    <View
      style={{
        marginLeft: "4%"
      }}>
      <Image
        style={{width: Dimensions.get('window').width, height: 150, left: "-5%"}}
        source={{
          uri: event.image === undefined ? "" : event.image,
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
        {/* {tags.map((label) => (
          <Text>{tag}</Text>
        ))} */}

        <Text>Tags using wrong data strcuture</Text>



        
        <Text>Created by {event.creator}</Text>
        <Text>{event.description}</Text>
        <Text>Location: {event.location}</Text>
        <Text>Start: {event.start_time}</Text>
        <Text>End: {event.end_time}</Text>
        <Text>Going: {event.users_going}</Text>
        <Text>Interested: {event.users_interested}</Text>
        <Button onPress={() => joinEvent()}>Join Event</Button>
        <Button onPress={() => addEventInterested()}>Interested</Button>
      </View>
    </View>
  );
};

export default EventScreen;
