import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Button, Card, Text, Title, Paragraph } from 'react-native-paper';
import UIStyles from '../styles';
import StoreService from '../../services/StoreService';

const DashGrid = () => {
  const navigation = useNavigation();
  const events = [1,2,3,4,5,6];
  const [storedEvents, setStoredEvents] = useState([]);
  const [numberLoaded, setNumberLoaded] = useState(0)
  const [eventsLoaded, setEventsLoaded] = useState(false);

  useFocusEffect(
    useCallback(() => {
      getStoredEvents();
    }, [])
  );

  useEffect(() => {
    getStoredEvents();
  }, []);

  const getStoredEvents = async () => {
    const storedEvents = await StoreService.getEvents();
    setStoredEvents(storedEvents);
    setEventsLoaded(true);
    setNumberLoaded(storedEvents.length)
    return storedEvents;
  }

  return (
    <ScrollView style={{ width: '100%', height:"100%", marginBottom: 10 }}>
      <Text>For you</Text>
      <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1, marginBottom: 10 }}>
        {storedEvents.map((event) => (
          <TouchableOpacity onPress={() => navigation.navigate('Event', { eventId: event.id })}>
            <Card style={{width:120, height : 180, margin:5}}>
              <Card.Cover style={{height : 110}} source={{ uri: event.image }} />
              <Card.Content>
                <Title>{event.name}</Title>
                <Paragraph>{`${event.start_time} - ${event.end_time}`}</Paragraph>
              </Card.Content>
            </Card>
          </TouchableOpacity>

      ))}
      </ScrollView>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginRight: 10 }}>
        <View style={{width:"48%", alignItems:"center"}}>
          <Text>Interested</Text>
          <View mode="contained" style={UIStyles.stack}>
            {/* {for (min(numberLoaded,4)) {
              <Image></Image>
            }
             
             })} */}
            <Text>Stack 1 - This will be a stack of images</Text>
          </View>
        </View>
        <View style={{width:"48%", alignItems:"center"}}>
          <Text>Joined</Text>
          <Button mode="contained" style={UIStyles.stack}>
            Stack 2 
          </Button>
        </View>
        <View>
        <Text>Activity</Text>
        <Text>Everything Else down here....</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default DashGrid;
