import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Button } from 'react-native-paper';
import { Checkbox } from 'react-native-paper';

import { useNavigation } from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';

import UIStyles from "./styles";

const FiltersScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const routeFilters = route.params?.filters
  const routeSearch = route.params?.search

  const [filters, setFilters] = useState({})
  const [search, setSearch] = useState('')
  const categories = {"Sport": ["Soccer", "Tennis"], "Social" : ["Meet up", "other thing"]}

  useEffect(() => {  
    setFilters(routeFilters ? (routeFilters) : ({}))
    setSearch(routeSearch ? (routeSearch) : (''))
  },[routeFilters, routeSearch])

  const isEqual = (arr1, arr2) => {
    if (!(arr1 && arr2)) {
      return false
    }

    const sortedArr1 = arr1.slice().sort();
    const sortedArr2 = arr2.slice().sort();
  
    return (
      sortedArr1.length === sortedArr2.length &&
      sortedArr1.every((value, index) => value === sortedArr2[index])
    );
  };

  const addCategory = (label, category) => {
    let prevCategories = { ...filters }['categories'] ? ({ ...filters }['categories']) : ({});

    if (category === null) {
      if (isEqual(prevCategories[label], categories[label])) {
        delete prevCategories[label];
      } else {
        prevCategories[label] = categories[label];
      }
    } else {
      if (!prevCategories[label]) {
        prevCategories[label] = [category];
      } else {
        if (prevCategories[label].includes(category)) {
          prevCategories[label] = prevCategories[label].filter((item) => item !== category);
          if (prevCategories[label].length === 0) {
            delete prevCategories[label];
          }
        } else {
          prevCategories[label].push(category);
        }
      }
    }

    let prevFilters = { ...filters }
    prevFilters['categories'] = prevCategories

    setFilters(prevFilters);
  };

  return (
    <View style={{margin:20, marginTop:80}}>
      <Text style={UIStyles.blackTitleText}>Filters!!</Text>
      <Button onPress={() => navigation.navigate('Search', { filters: filters })}>This assigns filters</Button>
      <Button onPress={() => navigation.navigate('Search', { filters: {} })}>This has no filters</Button>
      {Object.keys(categories).map((label) => (
        <View style={{backgroundColor:"#4287f5", marginBottom: 5}} key={label}>
          <View style={{alignItems:"center",flexDirection:"row",justifyContent:"space-between"}}>
            <Text style={UIStyles.blackTitleText}>{label}</Text>
            <Checkbox
              status={filters['categories'] ? (filters['categories'][label] ? (isEqual(filters['categories'][label], categories[label]) ? ('checked') : ('unchecked')) : ('unchecked')) : ('unchecked')}
              onPress={() => {
                addCategory(label, null)
              }}
            />
          </View>
          {categories[label]?.map((category) => (
            <View style={{alignItems:"center",flexDirection:"row",justifyContent:"space-between"}} key={category}>
            <Text>{category}</Text>
            <Checkbox
              status={filters['categories'] ? (filters['categories'][label] ? (filters['categories'][label].includes(category)? ('checked') : ('unchecked')) : ('unchecked')) : ('unchecked')}
              onPress={() => {
                addCategory(label, category)
              }}
            />
            </View>
            ))}
        </View>
      ))}
      <Text>{JSON.stringify(filters)}</Text>
    </View>
  );
};

export default FiltersScreen;
