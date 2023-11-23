import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Button, Card, Title, Paragraph, IconButton } from "react-native-paper";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import StoreService from "../services/StoreService";
import LoginSignup from "./Components/LoginSignup";
import { format } from "date-fns";
import UIStyles from "./styles";

const Profile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState("");
  const [events, setEvents] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const user = await StoreService.getActive();
  //     setUser(user);

  //     (user.username && (
  //       setEvents(await StoreService.getUsersEvents(user.username))
  //     ))
  //   };

  //   fetchData();
  // }, []);

  const fetchevents = async () => {
    user?.username &&
      setEvents(await StoreService.getUsersEvents(user.username));
  };

  useFocusEffect(
    useCallback(() => {
      const fetchUser = async () => {
        const user = await StoreService.getActive();
        setUser(user);
      };

      fetchUser();
    }, [])
  );

  useEffect(() => {
    fetchevents();
  }, [user]);

  const reload = () => {
    const fetchUser = async () => {
      const user = await StoreService.getActive();
      setUser(user);
    };

    fetchUser();
  };

  return (
    <View
      style={{
        flex: 1,
        margin: 20,
      }}>
      {!user ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}>
          <LoginSignup />
        </View>
      ) : (
        <>
          <Text style={UIStyles.blackTitleText}>{user.username}'s Profile</Text>
          <Text style={{ fontWeight: "bold" }}>Your Events</Text>
          <ScrollView
            horizontal={true}
            contentContainerStyle={{ flexGrow: 1, marginBottom: 10 }}>
            <TouchableOpacity
              key={"create"}
              onPress={() => {
                navigation.navigate("EventCreate");
              }}>
              <Card style={{ width: 120, height: 180, margin: 5 }}>
                <Card.Content style={{ alignItems: "center" }}>
                  <Title numberOfLines={1} style={{ fontSize: 14 }}>
                    Create Event
                  </Title>
                  <IconButton icon='plus' />
                </Card.Content>
              </Card>
            </TouchableOpacity>
            {events.map((event) => (
              <TouchableOpacity
                key={event.id}
                onPress={() =>
                  navigation.navigate("Event", { eventId: event.id })
                }>
                <Card
                  style={{ width: 120, height: 180, margin: 5 }}
                  onPress={() =>
                    navigation.navigate("Event", { eventId: event.id })
                  }>
                  <Card.Cover
                    style={{ height: 110 }}
                    source={{ uri: event.image }}
                  />
                  <Card.Content>
                    <Title numberOfLines={1} style={{ fontSize: 14 }}>
                      {event.name}
                    </Title>
                    <Paragraph numberOfLines={1} style={{ fontSize: 12 }}>
                      {format(new Date(event.date), "do/MMM")}
                    </Paragraph>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Button
            mode='contained'
            title='Create Event'
            buttonColor='red'
            style={{ margin: 10 }}
            onPress={() => {
              StoreService.removeActive();

              reload();
            }}>
            Log Out
          </Button>
        </>
      )}
    </View>
  );
};

export default Profile;
