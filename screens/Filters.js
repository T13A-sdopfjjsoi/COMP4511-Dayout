import React, { useState } from "react";
import { View, Text } from "react-native";
import { Button } from 'react-native-paper';

import { useNavigation } from "@react-navigation/native";

const FiltersScreen = () => {
  const navigation = useNavigation();
  const [filters, setFilters] = useState({categories: ['Sport']})

  return (
    <View style={{margin:50}}>
      <Text>Filters!!</Text>
      <Button onPress={() => navigation.navigate('Search', { filters: filters })}>This assigns filters</Button>
      <Button onPress={() => navigation.navigate('Search', { filters: {} })}>This has no filters</Button>
    </View>
  );
};

export default FiltersScreen;
