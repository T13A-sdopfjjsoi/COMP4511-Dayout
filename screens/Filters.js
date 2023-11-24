import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Button, Checkbox, IconButton } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';
import Dropdown from 'react-native-input-select';
import { DatePickerModal } from 'react-native-paper-dates';
import EventTypes from "../data/EventType.json";
import { AntDesign } from "@expo/vector-icons";

import { Collapsible } from "react-native-fast-collapsible";
import { format } from "date-fns";

import UIStyles from "./styles";

const FiltersScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const routeFilters = route.params?.filters
  const routeSearch = route.params?.search
  const [range, setRange] = useState({ startDate: undefined, endDate: undefined });
  const [open, setOpen] = React.useState(false);
  let globalCollapsibleIdCounter = 1;
  
  const [collapsibles, setCollapsibles] = useState(
    Object.keys(EventTypes).map((label) => ({
      id: globalCollapsibleIdCounter++,
      label,
      visible: false,
    }))
  );

  const toggleVisibility = (collapsibleId) => {
    setCollapsibles((prevCollapsibles) =>
      prevCollapsibles.map((collapsible) => ({
        ...collapsible,
        visible:
          collapsible.id === collapsibleId ? !collapsible.visible : false,
      }))
    );
  };

  const [filters, setFilters] = useState({})
  const [search, setSearch] = useState('')
  const [period, setPeriod] = useState('at')
  const periods = [
    {label: "All time", value: "at"},
    {label: "Today", value: "to"}, 
    {label: "1 Week", value: "1w"}, 
    {label: "1 Month", value: "1m"}, 
    {label: "Custom", value: "cu"}]
    
  // Taken from https://web-ridge.github.io/react-native-paper-dates/docs/date-picker/range-date-picker  
  const onDismiss = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);
  
  const onConfirm = React.useCallback(
    ({ startDate, endDate }) => {
      setOpen(false);
      setRange({ startDate, endDate });
    },
    [setOpen, setRange]
  );  

  const getTimestamp = () => {
    let start_time = new Date().getTime();
    let end_time = -1;
    
    switch (period) {
      case "to":
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return { start_time, end_time: tomorrow.getTime() }; 
      case "1w":
        const oneWeek = new Date();
        oneWeek.setDate(oneWeek.getDate() + 7);
        return { start_time, end_time: oneWeek.getTime() }; 
      case "1m":
        const oneMonth = new Date();
        oneMonth.setMonth(oneMonth.getMonth() + 1);
        return { start_time, end_time: oneMonth.getTime() };
      case "cu":
        return (range.startDate && range.endDate) ? 
          { start_time: range.startDate.getTime(), end_time: range.endDate.getTime() } :
          { start_time, end_time };
      default:
        return { start_time, end_time };
    }
  };
  

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
    let prevCategories = { ...filters }['tags'] ? ({ ...filters }['tags']) : ({});

    if (category === null) {
      if (isEqual(prevCategories[label], EventTypes[label])) {
        delete prevCategories[label];
      } else {
        prevCategories[label] = EventTypes[label];
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
    prevFilters['tags'] = prevCategories

    setFilters(prevFilters);
  };

  return (
    <View style={{margin:20, marginTop:80}}>
      <View style={{flexDirection:"row", justifyContent:"space-between", width:"100%"}}>
        <Text style={UIStyles.blackTitleText}>Filters</Text>
        <IconButton icon="close" onPress={() => navigation.navigate('Search', { filters: {...filters, ...getTimestamp()}})} />
      </View>
      <ScrollView>
      <Text style={{fontSize:25, margin:5}}>Period</Text>
      <View style={{ flexDirection: 'row', alignItems: 'top', width: '50%' }}>
        <Dropdown
          placeholder="Select period."
          options={periods}
          selectedValue={period}
          onValueChange={(value) => setPeriod(value)}
          primaryColor={'purple'}
          style={{ width: '50%' }}
        />
        {period === 'cu' && (
          <View style={{ width: '100%', alignItems:"center", flexDirection:"column"}}>
            <Text style={{margin:2}}>{
              range.startDate && range.endDate ? 
              (format(range.startDate,"do/MMM") 
              + " - " + 
              format(range.endDate,"do/MMM")
              ) : ("Period not selected")}</Text>
            <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined">
              Pick range
            </Button>
            <DatePickerModal
              locale="en-GB"
              mode="range"
              visible={open}
              onDismiss={onDismiss}
              startDate={range.startDate}
              endDate={range.endDate}
              onConfirm={onConfirm}
            />
          </View>
        )}
      </View>
      <View style={{justifyContent:"space-between", flexDirection:"row", width:"100%" }}>

      <Text style={{fontSize:25}}>Tags</Text>
        <Text style={{fontWeight:"bold"}}>
        {(() => {
          let count = 0;
          if (filters.tags) {
            Object.keys(filters.tags).forEach((key) => {
              count += filters.tags[key].length;
            });
            if (count === 1) {
              return count + " tag applied";
            }
            return count + " tags applied";
          } else {
            return "No tags applied";
          }
        })()}
        </Text>
        </View>
              
      {collapsibles.map((collapsible) => (
        <View style={{paddingLeft:10, marginBottom: 5}} key={collapsible.label}>
          <View style={{alignItems:"center",flexDirection:"row",justifyContent:"space-between", margin:5}}>
            <Text style={{fontSize:20}}>{collapsible.label}</Text>
            <View style={{flexDirection:"row"}}>
            <TouchableOpacity
              style={{marginRight:20}}
              onPress={() => toggleVisibility(collapsible.id)}>
              {collapsible.visible ? (
                <AntDesign name='up' size={24} color='black' />
              ) : (
                <AntDesign name='down' size={24} color='black' />
              )}
            </TouchableOpacity>
            <View style={{backgroundColor:"#cfcfcf"}}>
            <Checkbox
              color="purple"
              status={filters['tags'] ? (filters['tags'][collapsible.label] ? (isEqual(filters['tags'][collapsible.label], EventTypes[collapsible.label]) ? ('checked') : ('unchecked')) : ('unchecked')) : ('unchecked')}
              onPress={() => {
                addCategory(collapsible.label, null)
              }}
            />
            </View>
            </View>
          </View>
          <View style={{paddingLeft:10}}>
          {EventTypes[collapsible.label]?.map((category) => (
            <Collapsible
              isVisible={collapsible.visible}
              key={`${category}`}>
            <View style={{alignItems:"center",flexDirection:"row",justifyContent:"space-between", margin:5}} key={category}>
            <Text>{category}</Text>
            <View style={{backgroundColor:"#cfcfcf", }}>

            <Checkbox
              color="purple"
              status={filters['tags'] ? (filters['tags'][collapsible.label] ? (filters['tags'][collapsible.label].includes(category)? ('checked') : ('unchecked')) : ('unchecked')) : ('unchecked')}
              onPress={() => {
                addCategory(collapsible.label, category)
              }}
            />
            </View>
            </View>
            </Collapsible>
            ))}
          </View>
        </View>
      ))}
      </ScrollView>
    </View>
  );
};

export default FiltersScreen;