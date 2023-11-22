import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import StoreService from "../services/StoreService";

const EventCreate = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [tags, setTags] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const user = await StoreService.getActive();
    setUser(user);
  }

  const createEvent = async () => {
    const newEvent = await StoreService.addEvent({
      creator: user.username,
      name,
      image,
      description,
      location,
      start_time: startTime,
      end_time: startTime,
      tags: tags.split(','),
      users_going: [],
      users_interested: [],
      rating: "0.0",
      comments: []
    });
    console.log(newEvent);
    navigation.navigate("Home");
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        margin: "10%",
      }}>
      <View style={{ alignItems: "center" }}>
        <Text>Create Event</Text>
      </View>
      <View>
        <TextInput
          theme={{ roundness: 25 }}
          style={{
            overflow: "hidden",
            borderStyle: "solid",
            borderColor: "black",
            borderRadius: 25,
          }}
          label='Event Name'
          value={name}
          onChangeText={(name) => setName(name)}
        />
        <TextInput
          theme={{ roundness: 25 }}
          style={{
            overflow: "hidden",
            borderStyle: "solid",
            borderColor: "black",
            borderRadius: 25,
          }}
          label='Event Description'
          value={description}
          onChangeText={(description) => setDescription(description)}
        />
        <TextInput
          theme={{ roundness: 25 }}
          style={{
            overflow: "hidden",
            borderStyle: "solid",
            borderColor: "black",
            borderRadius: 25,
          }}
          label='Event Image URL'
          value={image}
          onChangeText={(image) => setImage(image)}
        />
        <TextInput
          theme={{ roundness: 25 }}
          style={{
            overflow: "hidden",
            borderStyle: "solid",
            borderColor: "black",
            borderRadius: 25,
          }}
          label='Event Location'
          value={location}
          onChangeText={(location) => setLocation(location)}
        />
        <TextInput
          theme={{ roundness: 25 }}
          style={{
            overflow: "hidden",
            borderStyle: "solid",
            borderColor: "black",
            borderRadius: 25,
          }}
          label='Event Date'
          value={date}
          onChangeText={(date) => setDate(date)}
        />
        <TextInput
          theme={{ roundness: 25 }}
          style={{
            overflow: "hidden",
            borderStyle: "solid",
            borderColor: "black",
            borderRadius: 25,
          }}
          label='Event Start Time'
          value={startTime}
          onChangeText={(startTime) => setStartTime(startTime)}
        />
        <TextInput
          theme={{ roundness: 25 }}
          style={{
            overflow: "hidden",
            borderStyle: "solid",
            borderColor: "black",
            borderRadius: 25,
          }}
          label='Event End Time'
          value={endTime}
          onChangeText={(endTime) => setEndTime(endTime)}
        />
        <TextInput
          theme={{ roundness: 25 }}
          style={{
            overflow: "hidden",
            borderStyle: "solid",
            borderColor: "black",
            borderRadius: 25,
          }}
          label="Event Tags (Enter tags separated by ',')"
          value={tags}
          onChangeText={(tags) => setTags(tags)}
        />
      </View>
      <View>
        <Button
          mode='contained'
          onPress={() =>
            createEvent()
          }>
          Create Event +
        </Button>
      </View>
    </View>
  );
};

export default EventCreate;
