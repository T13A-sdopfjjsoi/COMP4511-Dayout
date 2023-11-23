import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Button, Card, Text, Title, Paragraph } from 'react-native-paper';
import UIStyles from '../styles';
import StoreService from '../../services/StoreService';

const DashGrid = () => {
  const navigation = useNavigation();
  const events = [1,2,3,4,5,6];
  const [storedEvents, setStoredEvents] = useState([]);
  const [numberLoaded, setNumberLoaded] = useState(0)
  const [interested, setInterested] = useState([])
  const [joined, setJoined] = useState([])


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
    setInterested(storedEvents)
    setJoined(storedEvents)
    return storedEvents;
  }


  return (
    <ScrollView style={{ width: '100%', height:"100%", marginBottom: 10 }}>
      <Text style={{fontWeight:"bold"}}>For you</Text>
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
        <View style={{ width: '48%', alignItems: 'center' }}>
          <Text style={{fontWeight:"bold", marginBottom: 5}}>Interested</Text>
          <View style={UIStyles.stack}>
            {(() => {
              let stack = [];
              for (let index = 0; index < Math.min(events.length, 4); index++) {
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
                stack = ([<Text key="noInterested">No Interested Events</Text>]);
              }
              return stack 
            })()}
          </View>
        </View>
        <View style={{ width: '48%', alignItems: 'center' }}>
          <Text style={{fontWeight:"bold", marginBottom: 5}}>Joined</Text>
          <View style={UIStyles.stack}>
            {(() => {
              let stack = [];
              for (let index = 0; index < Math.min(events.length, 4); index++) {
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
                stack = ([<Text key="noJoined">No Joined Events</Text>]);
              }
              return stack 
            })()}
          </View>
        </View>
        <View>
          <Text style={{fontWeight:"bold", marginBottom: 5, marginTop:10}}>Activity</Text>
          <Text>Everything Else down here....</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default DashGrid;
