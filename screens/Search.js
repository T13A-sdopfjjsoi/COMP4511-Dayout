import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { Searchbar, Avatar, Button, Card, Title, Paragraph, IconButton  } from 'react-native-paper';
import UIStyles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';
import { format } from "date-fns";
import { el } from "react-native-paper-dates";


const Search = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const routeFilters = route.params?.filters
  const routeSearch = route.params?.search
  const [period, setPeriod] = useState("All time")

  const [searchQuery, setSearchQuery] = useState('');
  const events = [
    {"id": "1", "name": "This is the name", "categories":{"Sport":["Tennis"]}},
    {"id": "2", "name": "Fishing trip", "categories":{"Sport":["Tennis"]}},
    {"id": "3", "name": "Fishing thing", "categories":{"Sport":["Tennis"]}},
    {"id": "4", "name": "Different name", "categories":{"Sport":["Soccer"]}},
    {"id": "5", "name": "This isn't the name", "categories":{"Sport":["Tennis"]}},
  ]
  const [showEvents, setShowEvents] = useState(events);
  const [filters, setFilters] = useState({});


  useEffect(() => {  
    setFilters(routeFilters ? routeFilters : {});
    setSearchQuery(routeSearch ? routeSearch : '');

    if (routeFilters && routeFilters.endTime !== undefined && routeFilters.startTime !== undefined) {
      setPeriod(routeFilters.endTime === -1 ? 'All Time' : `${format(routeFilters.startTime, "do/MMM")} - ${format(routeFilters.endTime, "do/MMM")}`);
    } else {
      setPeriod('All Time');
    }
  }, [routeFilters, routeSearch]);

  const checkFilters = (event, query) => {
    let isFiltered = true;
  
    if (!event.name.includes(query)) {
      return false;
    }
  
    Object.keys(filters).forEach((key) => {
      if (key === "categories") {
        Object.keys(filters[key]).forEach((subKey) => {
          if (event[key][subKey]) {
            Object.keys(filters[key][subKey]).forEach((subSubKey) => {
              if (!event[key][subKey].includes(filters[key][subKey][subSubKey])) {
                isFiltered = false;
              }
            });
          } else {
            isFiltered = false;
          }
        });
      } else if (key === "startTime") {
        const eventStartTime = new Date(event[key]);
        if (eventStartTime.getTime() < filters[key]) {
          isFiltered = false;
        }
      } else if (key === "endTime") {
        if (period !== "All Time") {
          const eventEndTime = new Date(event[key]);
          if (eventEndTime.getTime() > filters[key]) {
            isFiltered = false;
          }
        }
      } else {
        isFiltered = false;
      }
    });
  
    return isFiltered;
  };
  
  

  const filterCount = () => {
    let count = 0
    filters['categories'] && (
      Object.keys(filters['categories']).map((key) => {
        count = count + filters['categories'][key].length
      })
    )
    return count;
  }

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    setShowEvents(events.filter((event) => (checkFilters(event, query))));
}


  return (
    <View>
    <Searchbar
      style={{margin:15, marginBottom:10}}
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
    <View style={{flexDirection: 'row', alignItems:"center", justifyContent: 'space-between', marginLeft: 15, marginRight: 15, marginBottom: 10}}>
      <View style={{flexDirection: 'row', alignItems:"center"}}>
        <Button style={{width:100, marginRight:5}} buttonColor="purple" textColor="white"
          onPress={() => navigation.navigate('Filters', { filters: filters })}
        >Fitlers</Button>
        <Text>{filterCount()} filters</Text>
      </View>
      <Text>{period}</Text>
    </View>

      <ScrollView style={{width:"100%", paddingLeft: 20, paddingRight: 20, marginBottom: 50}}>
        {showEvents.map((event) => (
          <Card key={event.id} style={UIStyles.searchCard} 
          onPress={() => navigation.navigate('Event', { eventId: event.id })}>
            <Card.Content>
              <Title>{event.name}</Title>
              <Paragraph>lorem ipsum and shit lorem ipsum and shit lorem ipsum and shit lorem ipsum and shit lorem ipsum and shit</Paragraph>
            </Card.Content>
            {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
            <Card.Actions>
              <IconButton icon="bookmark" onPress={() => console.log("Save " + event.id)}>Cancel</IconButton>
            </Card.Actions>
          </Card>
      ))}

      <View style={{ marginTop:100, flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Nothing more to show!</Text>
      </View>
      </ScrollView>
    </View>
  );
};

export default Search;
