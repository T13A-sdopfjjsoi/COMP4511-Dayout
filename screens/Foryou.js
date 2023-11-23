import React, { useState, useEffect } from "react";
import { View, Text, Image, Dimensions, ScrollView } from "react-native";
import { Button, TextInput } from "react-native-paper";
import StoreService from '../services/StoreService';
import UIStyles from "./styles.js";

const Foryou = () => {
  const [storedEvents, setStoredEvents] = useState([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(-1);
  const [currentEvent, setCurrentEvent] = useState({});
  const [tags, setTags] = useState([]);
  const [user, setUser] = useState({});
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    getUser();
    getStoredEvents();
    setCurrentEvent({});
    setCurrentEventIndex(0);
  }, []);

  useEffect(() => {
    setCurrentEvent(storedEvents[currentEventIndex]);
    if (storedEvents[currentEventIndex] == null || Object.keys(storedEvents[currentEventIndex]).length === 0) {
      return;
    };
    setStartTime(getTime(storedEvents[currentEventIndex]?.start_time));
    setEndTime(getTime(storedEvents[currentEventIndex]?.end_time));
    setTags(Object.values(storedEvents[currentEventIndex].tags));
  }, [currentEventIndex]);

  const getDays = () => {
    const future = new Date(currentEvent.date);
    const days = (future.getTime() - Date.now()) / (1000 * 3600 * 24);
    return Math.round(days);
  }

  const getTime = (a) => {
    if (a === undefined) {
      return "0";
    }
    const timeToString = a.toString();
    const timeEdited = timeToString.slice(0, 2) + ":" + timeToString.slice(2);
    const timeString = `${timeEdited}:00`
    const timeString12hr = new Date('1970-01-01T' + timeString + 'Z')
      .toLocaleTimeString('en-US',
        {timeZone:'UTC', hour12: true, hour: 'numeric', minute: 'numeric'}
      );
    
    return timeString12hr;
  }

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
    if (event !== null) {
      setEvent(event);
    } else {
      return null;
    }
  };

  const addEventInterested = () => {
    getUser();
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
    <View
      style={{
        flex: 1
      }}>
      <ScrollView style={{width:"100%"}}>
        <Image
          style={{width: Dimensions.get('window').width, height: 150, left: "-5%"}}
          source={{
            uri: currentEvent.image === undefined ? "" : currentEvent.image,
          }}
        />
        <View
          style={{
            margin: "3%"
          }}
        >
          <Text>
            <Text style={[UIStyles.titleText, { fontWeight: 'bold', color: "black" }]}>{currentEvent.name}</Text>
          </Text>
          <Text>Created by <Text style={{textDecorationLine: 'underline'}}>{currentEvent.creator}</Text></Text>
          <Text>Attendees: {currentEvent.users_going?.length}</Text>
          <Text>Interested: {currentEvent.users_interested?.length}</Text>
          <Text style={{textAlign: "right"}}>Starts in {getDays()} days</Text>
          <Text style={{textAlign: "right"}}>{startTime} - {endTime}</Text>
          <Text style={{textAlign: "right"}}>{currentEvent.location}</Text><br/>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          /> <br/>

          <View style={{flexDirection: 'row'}}>
            {tags.map((tag) => (
              tag.map((itag) => (
                <Button style={{marginRight:5}} buttonColor="#9474f1" textColor="white"
                onPress={() => navigation.navigate('Search')}
              >{itag}</Button>
              ))
            ))}
          </View> <br/>
          <Text style={{fontSize: 20}}>{currentEvent.description}</Text>

          <Button onPress={() => addEventNotInterested()}>Not Interested</Button>
          <Button onPress={() => addEventInterested()}>Interested</Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default Foryou;
