import React, { useState } from "react";
import { View, Text } from "react-native";
import { Button } from 'react-native-paper';
import { Checkbox } from 'react-native-paper';

import { useNavigation } from "@react-navigation/native";
import UIStyles from "./styles";

const FiltersScreen = () => {
  const navigation = useNavigation();
  const [filters, setFilters] = useState({})
  const categories = {"Sport": ["Soccer", "Tennis"], "Social" : ["Meet up", "other thing"]}
  const [checked, setChecked] = useState(false);

  const addFilter = (label, category) => {
    let prevFilters = { ...filters };

    if (category === null) {
      if (prevFilters[label]) {
        delete prevFilters[label];
      } else {
        prevFilters[label] = [];
      }
    } else {
      if (!prevFilters[label]) {
        prevFilters[label] = [category];
      } else {
        if (prevFilters[label].includes(category)) {
          prevFilters[label] = prevFilters[label].filter((item) => item !== category);
          if (prevFilters[label].length === 0) {
            delete prevFilters[label];
          }
        } else {
          prevFilters[label].push(category);
        }
      }
    }

    setFilters(prevFilters);
    console.log(filters);
  };

  return (
    <View style={{margin:20, marginTop:80}}>
      <Text style={UIStyles.blackTitleText}>Filters!!</Text>
      <Button onPress={() => navigation.navigate('Search', { filters: filters })}>This assigns filters</Button>
      <Button onPress={() => navigation.navigate('Search', { filters: {} })}>This has no filters</Button>
      {Object.keys(categories).map((label) => (
        <View>
          <View style={{alignItems:"center",flexDirection:"row",justifyContent:"space-between"}}>
            <Text style={UIStyles.blackTitleText}>{label}</Text>
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
                addFilter(label, null)
              }}
            />
          </View>
          {categories[label]?.map((category) => (
            <View style={{alignItems:"center",flexDirection:"row",justifyContent:"space-between"}}>
            <Text>{category}</Text>
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
                addFilter(label, category)
              }}
            />
            </View>
            ))}
        </View>
      ))}
    </View>
  );
};

export default FiltersScreen;
