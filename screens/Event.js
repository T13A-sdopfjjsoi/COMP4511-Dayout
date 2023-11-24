import React, { useState, useEffect } from "react";
import { View, Text, Image, Dimensions } from "react-native";
import Back from "./Components/Back";
import { Button } from "react-native-paper";
import { useRoute, useNavigation } from "@react-navigation/native";
import UIStyles from "./styles.js";
import StoreService from "../services/StoreService";
import LoadImage from "./Images/LoadImage.jpg";

const EventScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const eventId = route.params?.eventId;
  const [event, setEvent] = useState({});
  const [tags, setTags] = useState([]);
  const [user, setUser] = useState({});
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [pageReload, setPageReload] = useState(0);

  useEffect(() => {
    getUser();
    getEvent();
  }, []);

  useEffect(() => {
    getEvent();
  }, [pageReload]);

  const getDays = () => {
    const future = new Date(event.date);
    const days = (future.getTime() - Date.now()) / (1000 * 3600 * 24);
    return Math.round(days);
  };

  const getTime = (a) => {
    const timeToString = a.toString();
    const timeEdited = timeToString.slice(0, 2) + ":" + timeToString.slice(2);
    const timeString = `${timeEdited}:00`;
    const timeString12hr = new Date(
      "1970-01-01T" + timeString + "Z"
    ).toLocaleTimeString("en-US", {
      timeZone: "UTC",
      hour12: true,
      hour: "numeric",
      minute: "numeric",
    });

    return timeString12hr;
  };

  const getEvent = async () => {
    const event = await StoreService.getEvent(eventId);
    if (event !== null) {
      setEvent(event);
      setTags(Object.values(event.tags));
    } else {
      return null;
    }
    setStartTime(getTime(event.start_time));
    setEndTime(getTime(event.end_time));
  };

  const getUser = async () => {
    const user = await StoreService.getActive();
    setUser(user);
  };

  const joinEvent = () => {
    getUser();
    if (user.username == null) {
      return;
    }

    if (!event.users_going.includes(user.username)) {
      let newGoingList = event.users_going;
      newGoingList.push(user.username);
      setEvent((event) => ({
        ...event,
        users_going: newGoingList,
      }));

      updateEvent();
    }
  };

  const addEventInterested = () => {
    getUser();
    if (user.username == null) {
      return;
    }

    if (!event.users_interested.includes(user.username)) {
      let newInterestedList = event.users_interested;
      newInterestedList.push(user.username);
      setEvent((event) => ({
        ...event,
        users_interested: newInterestedList,
      }));
      updateEvent();
    }
  };

  const updateEvent = async () => {
    const eventToUpdate = await StoreService.updateEvent(event.id, event);
    setPageReload(pageReload + 1);
  };

  const goingButton = () => {
    if (event.users_going?.includes(getUser().username)) {
      return <Button>GOING ALREADY</Button>;
    } else {
      return <Button>NOT GOING ALREADY</Button>;
    }
  };

  if (Object.keys(event).length === 0) {
    return null;
  }

  return (
    <View
      style={{
        marginLeft: "4%",
      }}>
      <Image
        style={{
          width: Dimensions.get("window").width,
          height: 150,
          left: "-5%",
        }}
        source={
          event.image === undefined ? { LoadImage } : { uri: event.image }
        }
      />
      <Back />
      <View
        style={{
          margin: "3%",
        }}>
        <Text>
          <Text
            style={[
              UIStyles.titleText,
              { fontWeight: "bold", color: "black" },
            ]}>
            {event.name}
          </Text>
        </Text>
        <Text>
          Created by{" "}
          <Text style={{ textDecorationLine: "underline" }}>
            {event.creator}
          </Text>
        </Text>
        <Text>Attendees: {event.users_going?.length}</Text>
        <Text>Interested: {event.users_interested?.length}</Text>
        <Text style={{ textAlign: "right" }}>Starts in {getDays()} days</Text>
        <Text style={{ textAlign: "right" }}>
          {startTime} - {endTime}
        </Text>
        <Text style={{ textAlign: "right" }}>{event.location}</Text>
        <Text>{"\n"}</Text>
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: 1,
          }}
        />
        <Text>{"\n"}</Text>

        <View style={{ flexDirection: "row" }}>
          {tags.map((tag) =>
            tag.map((itag) => (
              <Button
                key={itag}
                style={{ marginRight: 5 }}
                buttonColor='#9474f1'
                textColor='white'
                onPress={() => navigation.navigate("Search")}>
                {itag}
              </Button>
            ))
          )}
        </View>
        <Text>{"\n"}</Text>
        <Text style={{ fontSize: 20 }}>{event.description}</Text>
        {event.users_going.includes(user.username) && (
          <Button disabled={true}>Already Joined</Button>
        )}
        {event.users_interested.includes(user.username) && (
          <Button disabled={true}>Already Interested</Button>
        )}

        {!event.users_going.includes(user.username) && (
          <Button onPress={() => joinEvent()}>Join Event</Button>
        )}

        {!event.users_interested.includes(user.username) && (
          <Button onPress={() => addEventInterested()}>Interested</Button>
        )}
      </View>
    </View>
  );
};

export default EventScreen;
