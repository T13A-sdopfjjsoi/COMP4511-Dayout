import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { Searchbar, Avatar, Button, Card, Title, Paragraph, IconButton  } from 'react-native-paper';
import UIStyles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';

const Search = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [searchQuery, setSearchQuery] = useState(route.params?.searchQuery ? route.params?.searchQuery : '');
  const events = ["1","2","3","4","5","15"];
  const [showEvents, setShowEvents] = useState(events);
  const [filters, setFilters] = useState(route.params?.filters ? (route.params.filters) : ({}));
  console.log((route.params?.filters ? (route.params.filters) : ({})))


  const [period, setPeriod] = useState("All time")

  const filterCount = (filters.categories ? (999) : (0))

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
        <Text>{filterCount} filters</Text>
      </View>
      <Text>Showing {period}</Text>
    </View>

      <ScrollView style={{width:"100%", paddingLeft: 20, paddingRight: 20, paddingBottom: 10}}>
        {showEvents.map((event) => (
          <Card key={event} style={UIStyles.searchCard} 
          onPress={() => navigation.navigate('Event', { eventId: event })}>
            <Card.Content>
              <Title>Event title here = {event}</Title>
              <Paragraph>lorem ipsum and shit lorem ipsum and shit lorem ipsum and shit lorem ipsum and shit lorem ipsum and shit</Paragraph>
            </Card.Content>
            {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
            <Card.Actions>
              <IconButton icon="bookmark">Cancel</IconButton>
            </Card.Actions>
          </Card>
      ))}
      </ScrollView>
    </View>
  );
};

export default Search;
