import React, { useState, useEffect, useCallback } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { Searchbar, Avatar, Button, Card, Title, Paragraph, IconButton } from 'react-native-paper';
import UIStyles from "./styles";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';
import { format } from "date-fns";
import StoreService from "../services/StoreService";

const Search = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const routeFilters = route.params?.filters
  const routeSearch = route.params?.search
  const [period, setPeriod] = useState("All time")

  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState([])
  const [showEvents, setShowEvents] = useState(events);
  const [filters, setFilters] = useState({start_time : new Date().getTime()});

  useFocusEffect(
    useCallback(() => {
      const fetchEvents = async () => {
        const events = await StoreService.getEvents();
        setEvents(events)
      };
  
      fetchEvents();
    }, [])
  );

  useEffect(() => {
    const fetchEvents = async () => {
      const events = await StoreService.getEvents();
      setShowEvents(events)
    };

    fetchEvents();
  },[])
      
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
        const eventStartTime = parseInt(new Date(event["date"]));
        if (eventStartTime < filters[key]) {
          isFiltered = false;
        }
      } else if (key === "end_time") {
        if (filters[key] !== -1) {
          const eventEndTime = parseInt(new Date(event["date"]));
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
    <View style={{flex: 1}}>
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
          >Filters</Button>
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
                  <Text>{format(new Date(event.date), "d/MMM")}</Text>
              </View>
              <View style={{flexDirection:"row"}}>
                <Image style={{height : 110, width: 110, borderRadius:10}} source={{ uri: event.image }} />
                <View style={{margin: 10, width:"60%"}}>
                  <Text numberOfLines={6} >{event.description}</Text>
                </View>
              </View>
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
