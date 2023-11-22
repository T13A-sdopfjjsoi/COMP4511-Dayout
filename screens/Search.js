import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { Searchbar, Avatar, Button, Card, Title, Paragraph, IconButton  } from 'react-native-paper';
import UIStyles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';
import { format } from "date-fns";

const Search = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const routeFilters = route.params?.filters
  const routeSearch = route.params?.search
  const [period, setPeriod] = useState("All time")

  const [searchQuery, setSearchQuery] = useState('');
  const events = [
    {
      "id": "event-1234",
      "creator": "thegardenpeople",
      "name": "Gardene11r Wars",
      "image": "https://images.unsplash.com/photo-1418985991508-e47386d96a71",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolo.",
      "location": "UNSW Anzac Parade",
      "start_time": "2740572236424",
      "end_time": "if endtime is not empty, duration of event is end-start, if is empty, then duration is all day",
      "tags": {"Sport": ["Soccer"]},
      "users_going": ["ben", "josh"],
      "users_interested": ["thesnowpeople", "samuel"],
      "rating": "5.0",
      "comments": [
        {
          "id": "post-123",
          "commenter": "thesnowpeople",
          "content": "I LOVE GARDEN WARS SO MUCH #GARDENGANG LETS GOOOO"
        }
      ]
    }, {
      "id": "event-12553",
      "creator": "thegardenpeople",
      "name": "Gardene222r Wars",
      "image": "https://images.unsplash.com/photo-1418985991508-e47386d96a71",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolo.",
      "location": "UNSW Anzac Parade",
      "start_time": "1945559593505",
      "end_time": "if endtime is not empty, duration of event is end-start, if is empty, then duration is all day",
      "tags": {"Sport": ["Soccer"]},
      "users_going": ["ben", "josh"],
      "users_interested": ["thesnowpeople", "samuel"],
      "rating": "5.0",
      "comments": [
        {
          "id": "post-123",
          "commenter": "thesnowpeople",
          "content": "I LOVE GARDEN WARS SO MUCH #GARDENGANG LETS GOOOO"
        }
      ]
    }, {
      "id": "event-12663",
      "creator": "thegardenpeople",
      "name": "Garden33r Wars",
      "image": "https://images.unsplash.com/photo-1418985991508-e47386d96a71",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolo.",
      "location": "UNSW Anzac Parade",
      "start_time": "1799445993505",
      "end_time": "if endtime is not empty, duration of event is end-start, if is empty, then duration is all day",
      "tags": {"Sport": ["Soccer"]},
      "users_going": ["ben", "josh"],
      "users_interested": ["thesnowpeople", "samuel"],
      "rating": "5.0",
      "comments": [
        {
          "id": "post-123",
          "commenter": "thesnowpeople",
          "content": "I LOVE GARDEN WARS SO MUCH #GARDENGANG LETS GOOOO"
        }
      ]
    }
  ]
  const [showEvents, setShowEvents] = useState(events);
  const [filters, setFilters] = useState({start_time : new Date().getTime()});


  useEffect(() => {  
    setFilters(routeFilters ? routeFilters : { start_time: new Date().getTime() });
    setSearchQuery(routeSearch ? routeSearch : '');
  
    if (routeFilters && routeFilters.end_time !== undefined && routeFilters.start_time !== undefined) {
      setPeriod(routeFilters.end_time === -1 ? 'All Time' : `${format(routeFilters.start_time, "do/MMM")} - ${format(routeFilters.end_time, "do/MMM")}`);
    } else {
      setPeriod('All Time');
    }
  
    if (routeSearch) {
      setShowEvents(events.filter((event) => checkFilters(event, routeSearch, routeFilters)));
    } else {
      setShowEvents(events.filter((event) => checkFilters(event, "", routeFilters)));
    }
  }, [routeFilters, routeSearch]);


  const checkFilters = (event, query, filters) => {
    let isFiltered = true;
    if (!filters) {
      return isFiltered
    }

    if (!event.name.includes(query)) {
      return false;
    }

    Object.keys(filters).forEach((key) => {
      if (key === "tags") {
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
      } else if (key === "start_time") {
        const eventStartTime = parseInt(event[key]);
        if (eventStartTime < filters[key]) {
          isFiltered = false;
        }
      } else if (key === "end_time") {
        if (filters[key] !== -1) {
          const eventEndTime = parseInt(event["start_time"]);
          if (eventEndTime > filters[key]) {
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
    filters['tags'] && (
      Object.keys(filters['tags']).map((key) => {
        count = count + filters['tags'][key].length
      })
    )
    return count;
  }

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    setShowEvents(events.filter((event) => (checkFilters(event, query, filters))));
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
        <Button style={{width:100, marginRight:5}} buttonColor="#63519f" textColor="white"
          onPress={() => navigation.navigate('Filters', { filters: filters })}
        >Fitlers</Button>
        <Text>{filterCount()} filters</Text>
      </View>
      <Text>{period}</Text>
    </View>

      <ScrollView style={{width:"100%", paddingLeft: 20, paddingRight: 20}}>
        {showEvents.map((event) => (
          <Card key={event.id} style={UIStyles.searchCard} 
          onPress={() => navigation.navigate('Event', { eventId: event.id })}>
            <Card.Content>
              <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                <Title>{event.name}</Title>
                <Text>{format(new Date(parseInt(event.start_time) * 1000), "d/MMM")}</Text>

              </View>
              <Paragraph numberOfLines={3}>{event.description}</Paragraph>
            </Card.Content>
            {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
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
