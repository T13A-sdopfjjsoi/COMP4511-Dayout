import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { View, Text, Alert } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import StoreService from "../services/StoreService";
import Back from "./Components/Back"

const EventCreate = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const intitialTags = route.params?.filters 
  const [tags, setTags] = useState({})

  const [user, setUser] = useState({});

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    setTags(intitialTags ? intitialTags['tags'] ? intitialTags['tags'] : {} : {});
  }, [intitialTags]);

  const getUser = async () => {
    const user = await StoreService.getActive();
    setUser(user);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    console.log(result.assets);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const createEvent = async () => {
    const showAlert = () => {
      Alert.alert(
        'Invalid Inputs',
        'Events must contain at least a name, date and image!',
        [
          { text: 'OK' },
        ],
        { cancelable: false }
      );
    }

    if (!(name && date && image)) {
      showAlert()
      return;
    }

    const newEvent = await StoreService.addEvent({
      creator: user.username,
      name,
      image,
      description,
      location,
      start_time: startTime,
      date,
      end_time: startTime,
      tags: tags,
      users_going: [],
      users_interested: [],
      rating: "0.0",
      comments: [],
    });
    console.log(newEvent);
    navigation.navigate("Home");
  };

  const navigateToEventTags = () => {
    navigation.navigate("EventTags");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        margin: "10%",
      }}>
      <Back/>
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
        <Button onPress={pickImage} icon="view-gallery">Pick an image</Button>
        <Button onPress={navigateToEventTags}>Add Tags</Button>
      </View>
      <View>
        <Button
          mode="contained"
          onPress={() => createEvent()}
        >
          Create Event +
        </Button>
        <Text style={{fontWeight:"bold"}}>Either delete or make this prettier -{">"} {JSON.stringify(tags)}</Text>
      </View>
    </View>
  );
};

export default EventCreate;