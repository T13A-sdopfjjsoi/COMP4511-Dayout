import React, { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Button, Text } from 'react-native-paper';
import UIStyles from '../styles';
import StoreService from '../../services/StoreService';

const DashGrid = () => {
  const navigation = useNavigation();
  const events = [1,2,3,4,5,6];
  const [storedEvents, setStoredEvents] = useState([]);
  const [eventsLoaded, setEventsLoaded] = useState(false);

  useEffect(() => {
    getStoredEvents();
  }, []);

  const getStoredEvents = async () => {
    const storedEvents = await StoreService.getEvents();
    setStoredEvents(storedEvents);
    setEventsLoaded(true);

    return storedEvents;
  }

  return (
    <ScrollView style={{ width: '100%', height:"100%", marginBottom: 10 }}>
      <Text>For you</Text>
      <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1, marginBottom: 10 }}>
        {storedEvents.map((event) => (
        <Button
          key={event.id} 
          mode='contained'
          style={UIStyles.scrollStackItem}
          onPress={() => {
            navigation.navigate('Event', { eventId: event.id });
          }}
        >
          {event.name}
        </Button>
      ))}
      </ScrollView>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginRight: 10 }}>
        <View style={{width:"48%", alignItems:"center"}}>
          <Text>Interested</Text>
          <Button mode="contained" style={UIStyles.stack}>
            Stack 1 - This will be a stack of images
          </Button>
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
