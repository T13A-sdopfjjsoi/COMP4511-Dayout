import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { Searchbar, Avatar, Button, Card, Title, Paragraph, IconButton  } from 'react-native-paper';
import UIStyles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';

const Search = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const routeFilters = route.params?.filters
  const routeSearch = route.params?.search


  const [searchQuery, setSearchQuery] = useState('');
  const events = ["1","2","3","4","5","15","1155325"];
  const [showEvents, setShowEvents] = useState(events);
  const [filters, setFilters] = useState({});

  useEffect(() => {  
    setFilters(routeFilters ? (routeFilters) : ({}))
    onChangeSearch(routeSearch ? (routeSearch) : (''))
  },[routeFilters, routeSearch])

  const checkFilters = (event) => {
    Object.keys(filters).forEach((key) => {
      // Going through overarching filters i.e. categories, time, etc.
      if (event[key]) {
        Object.keys(filters[key]).forEach((subKey) => {
          // Going through that filter (categories/Sport)
          if (event[key][subKey]) {
            Object.keys(filters[key][subKey]).forEach((subSubKey) => {
              // For cases of Filter = categories/Sport/Soccer
              if (!event[key][subKey]) { 
                return false
              }
            })
          } else {
            return false
          }
        })
      } else {
        return false
      }
    })

    return true
  }

  const [period, setPeriod] = useState("All time")

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
    setSearchQuery(query),
    setShowEvents(events.filter((event) => (event.includes(query))));
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
      <Text>Showing {period}</Text>
    </View>

      <ScrollView style={{width:"100%", paddingLeft: 20, paddingRight: 20, marginBottom: 50}}>
        {showEvents.map((event) => (
          <Card key={event} style={UIStyles.searchCard} 
          onPress={() => navigation.navigate('Event', { eventId: event })}>
            <Card.Content>
              <Title>Event title here = {event}</Title>
              <Paragraph>lorem ipsum and shit lorem ipsum and shit lorem ipsum and shit lorem ipsum and shit lorem ipsum and shit</Paragraph>
            </Card.Content>
            {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
            <Card.Actions>
              <IconButton icon="bookmark" onPress={() => console.log("Save " + event)}>Cancel</IconButton>
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
