import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Button, Checkbox, Menu, Divider } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';
import Dropdown from 'react-native-input-select';
import { DatePickerModal } from 'react-native-paper-dates';
import { format } from "date-fns";


import UIStyles from "./styles";

const FiltersScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const routeFilters = route.params?.filters
  const routeSearch = route.params?.search
  const [range, setRange] = useState({ startDate: undefined, endDate: undefined });
  const [open, setOpen] = React.useState(false);

  const [filters, setFilters] = useState({})
  const [search, setSearch] = useState('')
  const [period, setPeriod] = useState('at')
  const categories = {"Sport": ["Soccer", "Tennis"], "Social" : ["Meet up", "other thing"]}
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
    let startTime = new Date().getTime();
    let endTime = -1;
    
    switch (period) {
      case "to":
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return { startTime, endTime: tomorrow.getTime() }; 
      case "1w":
        const oneWeek = new Date();
        oneWeek.setDate(oneWeek.getDate() + 7);
        return { startTime, endTime: oneWeek.getTime() }; 
      case "1m":
        const oneMonth = new Date();
        oneMonth.setMonth(oneMonth.getMonth() + 1);
        return { startTime, endTime: oneMonth.getTime() };
      case "cu":
        return (range.startDate && range.endDate) ? 
          { startTime: range.startDate.getTime(), endTime: range.endDate.getTime() } :
          { startTime, endTime };
      default:
        return { startTime, endTime };
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
      <Text style={UIStyles.blackTitleText}>Filters</Text>
      <Button onPress={() => navigation.navigate('Search', { filters: {...filters, ...getTimestamp()}})}>Close</Button>
      <Text>Period</Text>
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
      <Text>Categories</Text>

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

