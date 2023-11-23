import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Button, Card, Text, Title, Paragraph } from 'react-native-paper';
import UIStyles from '../styles';
import StoreService from '../../services/StoreService';
import { format } from "date-fns";

const DashGrid = () => {
  const navigation = useNavigation();
  const events = [1,2,3,4,5,6];
  const [storedEvents, setStoredEvents] = useState([]);
  const [interested, setInterested] = useState([])
  const [shuffled, setShuffled] = useState([])

  const [joined, setJoined] = useState([])
  const [user, setUser] = useState('')

  useFocusEffect(
    useCallback(() => {
      getStoredEvents();
    }, [])
  );

  useEffect(() => {
    const fetchUser = async () => {
      const user = await StoreService.getActive();
      setUser(user);
    };
    getStoredEvents();
    fetchUser();
  }, []);


  const getStoredEvents = async () => {
    const storedEvents = await StoreService.getEvents();
    setStoredEvents(storedEvents);
    //https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
    setInterested(storedEvents.sort((a, b) => 0.5 - Math.random()))
    setShuffled(storedEvents.sort((a, b) => 0.5 - Math.random()))
    setJoined(storedEvents.sort((a, b) => 0.5 - Math.random()))
    return storedEvents;
  }


  return (
    (user ? (
      <ScrollView style={{ width: '100%', height:"100%", marginBottom: 10 }}>
        <Text style={{fontWeight:"bold"}}>For you</Text>
        <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1, marginBottom: 10 }}>
          {storedEvents.map((event) => (
            <TouchableOpacity key={event.id} onPress={() => navigation.navigate('Event', { eventId: event.id })}>
            <Card style={{width: 120, height: 180, margin:5,}} onPress={()=>navigation.navigate("Event", {eventId: event.id })}>
            <Card.Cover style={{height : 110}} source={{ uri: event.image }} />
            <Card.Content>
              <Title numberOfLines={1} style={{fontSize:14}}>{event.name}</Title>
              <Paragraph numberOfLines={1} style={{fontSize:12}}>{format(new Date(event.date), "do/MMM")}</Paragraph>
            </Card.Content>
          </Card>
          </TouchableOpacity>
        ))}
        {storedEvents.length === 0 && (
          <Card key={"suggestions"} style={{justifyContent:"center", alignItems:"center", width: 120, height: 180, margin:5,}}>
            <Card.Content style={{justifyContent:"center"}}>
              <Title style={{fontSize:14}}>No Events</Title>
            </Card.Content>
          </Card>
        )}
        </ScrollView>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginRight: 10 }}>
          <TouchableOpacity style={{ width: '48%', alignItems: 'center' }} onPress={() => navigation.navigate("Search")}>
            <Text style={{fontWeight:"bold", marginBottom: 5}}>Interested</Text>
            <View style={UIStyles.stack}>
              {(() => {
                let stack = [];
                for (let index = 0; index < Math.min(interested.length, 4); index++) {
                  if (interested[index]?.image) {
                      stack.push(
                        <Image
                          key={"interested" + index}
                          source={{ uri: interested[index]?.image }}
                          style={{ width: '50%', height: '50%' }}
                        />
                      );
                    }
                  }

                if (stack.length === 0) {
                  stack = ([<Text key="noInterested" style={{padding:10}}>No Interested Events</Text>]);
                }
                return stack 
              })()}
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: '48%', alignItems: 'center' }} onPress={() => navigation.navigate("Search")}>
            <Text style={{fontWeight:"bold", marginBottom: 5}}>Joined</Text>
            <View style={UIStyles.stack}>
              {(() => {
                let stack = [];
                for (let index = 0; index < Math.min(joined.length, 4); index++) {
                  if (joined[index]?.image) {
                      stack.push(
                        <Image
                          key={"Joined" + index}
                          source={{ uri: joined[index]?.image }}
                          style={{ width: '50%', height: '50%' }}
                        />
                      );
                    }
                  }

                if (stack.length === 0) {
                  stack = ([<Text key="noJoined" style={{padding:10}}>No Joined Events</Text>]);
                }
                return stack 
              })()}
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    ) : (
      <ScrollView style={{ width: '100%', height:"100%", marginBottom: 10 }}>
        <Text style={{fontWeight:"bold"}}>For you</Text>
        <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1, marginBottom: 10 }}>
          {storedEvents.map((event) => (
            <TouchableOpacity key={event.id + "fy"} onPress={() => navigation.navigate('Event', { eventId: event.id })}>
            <Card  style={{width: 120, height: 180, margin:5,}} onPress={()=>navigation.navigate("Event", {eventId: event.id })}>
            <Card.Cover style={{height : 110}} source={{ uri: event.image }} />
            <Card.Content>
              <Title numberOfLines={1} style={{fontSize:14}}>{event.name}</Title>
              <Paragraph numberOfLines={1} style={{fontSize:12}}>{format(new Date(event.date), "do/MMM")}</Paragraph>
            </Card.Content>
          </Card>
          </TouchableOpacity>
        ))}
        {storedEvents.length === 0 && (
          <Card key={"suggestions"} style={{justifyContent:"center", alignItems:"center", width: 120, height: 180, margin:5,}}>
            <Card.Content style={{justifyContent:"center"}}>
              <Title style={{fontSize:14}}>No Events</Title>
            </Card.Content>
          </Card>
        )}
        </ScrollView>
        <Text style={{fontWeight:"bold"}}>More suggestions</Text>
        <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1, marginBottom: 10 }}> 
          {shuffled.map((event) => (
            <TouchableOpacity key={event.id + "ms"} onPress={() => navigation.navigate('Event', { eventId: event.id })}>
            <Card style={{width: 120, height: 180, margin:5,}} onPress={()=>navigation.navigate("Event", {eventId: event.id })}>
            <Card.Cover style={{height : 110}} source={{ uri: event.image }} />
            <Card.Content>
              <Title numberOfLines={1} style={{fontSize:14}}>{event.name}</Title>
              <Paragraph numberOfLines={1} style={{fontSize:12}}>{format(new Date(event.date), "do/MMM")}</Paragraph>
            </Card.Content>
          </Card>
          </TouchableOpacity>
        ))}
        {shuffled.length === 0 && (
          <Card key={"suggestions"} style={{justifyContent:"center", alignItems:"center", width: 120, height: 180, margin:5,}}>
            <Card.Content style={{justifyContent:"center"}}>
              <Title style={{fontSize:14}}>No Events</Title>
            </Card.Content>
          </Card>
        )}
        </ScrollView>
    </ScrollView>
    ))
  );
};

export default DashGrid;
