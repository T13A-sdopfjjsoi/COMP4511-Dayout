import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Searchbar, Avatar, Button, Card, Title, Paragraph, IconButton  } from 'react-native-paper';
import UIStyles from "./styles";
import { useNavigation } from "@react-navigation/native";

const Search = () => {
  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);
  const events = [1,2,3,4,5,6];

  return (
    <View>
    <Searchbar
      style={{margin:20}}
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
      <ScrollView style={{width:"100%", paddingLeft: 20, paddingRight: 20, paddingBottom: 20}}>
        <Text>{searchQuery}</Text>
        {events.map((event) => (
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
