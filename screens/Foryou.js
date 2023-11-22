import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { Button, TextInput } from "react-native-paper";
import StoreService from '../services/StoreService';

const Foryou = () => {
  const [storedEvents, setStoredEvents] = useState([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(-1);
  const [currentEvent, setCurrentEvent] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    getUser();
    getStoredEvents();
    setCurrentEvent({});
    setCurrentEventIndex(0);
  }, []);

  useEffect(() => {
    setCurrentEvent(storedEvents[currentEventIndex]);
  }, [currentEventIndex]);

  const getUser = async () => {
    const user = await StoreService.getActive();
    setUser(user);
  };

  const getStoredEvents = async () => {
    const storedEvents = await StoreService.getEvents();
    setStoredEvents(storedEvents);
    return storedEvents;
  }

  const updateInterestedStatus = async () => {
    const event = await StoreService.updateEvent(currentEvent.id, currentEvent);
    Object.keys(event).forEach((key) => console.log(key))
    if (event !== null) {
      console.log(event);
      setEvent(event);
    } else {
      console.log("Event not found");
      return null;
    }
  };


  const addEventInterested = () => {
    if (user.username == null) {
      setCurrentEventIndex(currentEventIndex + 1);
      return;
    }

    if (!currentEvent.users_interested.includes(user.username)) {
      let newInterestedList = currentEvent.users_interested;
      newInterestedList.push(user.username);
      setCurrentEvent(currentEvent => ({
        ...currentEvent,
        users_interested: newInterestedList
      }));
      updateInterestedStatus();
    }
    setCurrentEventIndex(currentEventIndex + 1);
  }

  const addEventNotInterested = () => {
    console.log("Not" + currentEvent.id);
    setCurrentEventIndex(currentEventIndex + 1);
  }

  if (currentEvent == null || Object.keys(currentEvent).length === 0) {
    return (
      <View>
        <Text>No events found!</Text>
      </View>
    );
  };

  return (
    <View>
      <Text>Foryou</Text>
      {/* <Text>{JSON.stringify(currentEvent)}</Text> */}
      <Text>Event {currentEvent.id}</Text>
      <Text>Created by {currentEvent.creator}</Text>
      <Text>{currentEvent.description}</Text>
      <Text>Location: {currentEvent.location}</Text>
      <Text>Start: {currentEvent.start_time}</Text>
      <Text>End: {currentEvent.end_time}</Text>
      <Text>Tags: {JSON.stringify(currentEvent.tags)}</Text>
      <Text>Interested: {JSON.stringify(currentEvent.users_interested)}</Text>
      <Image
        style={{width: 50, height: 50}}
        source={{
          uri: currentEvent.image,
        }}
      />
      <Button onPress={() => addEventNotInterested()}>Not Interested</Button>
      <Button onPress={() => addEventInterested()}>Interested</Button>
    </View>
  );
};

export default Foryou;
