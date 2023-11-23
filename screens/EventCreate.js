import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { View, Text, Alert } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { DatePickerModal } from 'react-native-paper-dates';
import StoreService from "../services/StoreService";
import Back from "./Components/Back"
import { format } from "date-fns";

const EventCreate = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(undefined);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const intitialTags = route.params?.filters 
  const [tags, setTags] = useState({})
  const [open, setOpen] = useState(false)

  const [user, setUser] = useState({});

  // https://web-ridge.github.io/react-native-paper-dates/docs/date-picker/single-date-picker
  const onDismiss = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirm = React.useCallback(
    (params) => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate]
  );

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
        'Events must contain at least a name, start time and image!',
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
      date,
      start_time: startTime,
      end_time: endTime,
      tags: tags,
      users_going: [],
      users_interested: [],
      rating: [],
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
          label='Event Start Time (24 hour time)'
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
          label='Event End Time (24 hour time)'
          value={endTime}
          onChangeText={(endTime) => setEndTime(endTime)}
        />

        <Button onPress={pickImage} icon="view-gallery">Pick an image</Button>
        <Button onPress={navigateToEventTags}>Add Tags</Button>
      </View>
      <Button onPress={() => setOpen(true)} mode="outlined">
        {date ? format(date, "do/MMM/yyyy") : "Pick Date"}
      </Button>
      <DatePickerModal
        locale="en-GB"
        mode="single"
        visible={open}
        onDismiss={onDismiss}
        date={date}
        onConfirm={onConfirm}
      />
      <View>
        <Button
          mode="contained"
          onPress={() => createEvent()}
        >
          Create Event +
        </Button>
        <View style={{justifyContent:"center", width:"100%" }}>
        <Text style={{fontWeight:"bold", textAlign: 'center', margin: 5}}>
        {
          (() => {
            let count = 0;
            Object.keys(tags).forEach((key) => {
              count += tags[key].length;
            });
            if (count === 1) { 
              return count + " tag applied"
            }
            return count + " tags applied"
          })()
        }
        </Text>
        </View>
      </View>
    </View>
  );
};

export default EventCreate;