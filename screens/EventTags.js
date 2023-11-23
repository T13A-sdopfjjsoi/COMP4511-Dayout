import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Button, Checkbox } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Collapsible } from "react-native-fast-collapsible";
import { AntDesign } from "@expo/vector-icons";

import EventTypes from "../data/EventType.json";

import UIStyles from "./styles";

const EventTags = () => {
  const navigation = useNavigation();

  let globalCollapsibleIdCounter = 1;
  const [collapsibles, setCollapsibles] = useState(
    Object.keys(EventTypes).map((label) => ({
      id: globalCollapsibleIdCounter++,
      label,
      visible: false,
    }))
  );

  const isEqual = (arr1, arr2) => {
    if (!(arr1 && arr2)) {
      return false;
    }

    const sortedArr1 = arr1.slice().sort();
    const sortedArr2 = arr2.slice().sort();

    return (
      sortedArr1.length === sortedArr2.length &&
      sortedArr1.every((value, index) => value === sortedArr2[index])
    );
  };

  const toggleVisibility = (collapsibleId) => {
    setCollapsibles((prevCollapsibles) =>
      prevCollapsibles.map((collapsible) => ({
        ...collapsible,
        visible:
          collapsible.id === collapsibleId ? !collapsible.visible : false,
      }))
    );
  };

  const [filters, setFilters] = useState({});

  const addCategory = (label, category) => {
    let prevCategories = { ...filters }['tags'] ? { ...filters }['tags'] : {};

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
          prevCategories[label] = prevCategories[label].filter(
            (item) => item !== category
          );
          if (prevCategories[label].length === 0) {
            delete prevCategories[label];
          }
        } else {
          prevCategories[label].push(category);
        }
      }
    }

    let prevFilters = { ...filters };
    prevFilters['tags'] = prevCategories;

    setFilters(prevFilters);
  };

  const goBack = () => {
    navigation.goBack();
    navigation.navigate("EventCreate", { filters });
  };

  return (
    <ScrollView style={{ margin: 20, marginTop: 80 }}>
      <Text style={UIStyles.blackTitleText}>Event Tags</Text>

      {collapsibles.map((collapsible) => (
        <View style={{ paddingLeft: 10, marginBottom: 5 }} key={collapsible.label}>
          <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between", margin: 5 }}>
            <Text style={{ fontSize: 20 }}>{collapsible.label}</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{ marginRight: 20 }}
                onPress={() => toggleVisibility(collapsible.id)}>
                {collapsible.visible ? (
                  <AntDesign name='up' size={24} color='black' />
                ) : (
                  <AntDesign name='down' size={24} color='black' />
                )}
              </TouchableOpacity>
              <View style={{ backgroundColor: "#cfcfcf" }}>
                <Checkbox
                  color="purple"
                  status={filters['tags'] ? (filters['tags'][collapsible.label] ? (isEqual(filters['tags'][collapsible.label], EventTypes[collapsible.label]) ? ('checked') : ('unchecked')) : ('unchecked')) : ('unchecked')}
                  onPress={() => {
                    addCategory(collapsible.label, null);
                  }}
                />
              </View>
            </View>
          </View>
          <View style={{ paddingLeft: 10 }}>
            {EventTypes[collapsible.label]?.map((category) => (
              <Collapsible
                isVisible={collapsible.visible}
                key={`${category}`}>
                <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between", margin: 5 }} key={category}>
                  <Text>{category}</Text>
                  <View style={{ backgroundColor: "#cfcfcf", }}>
                    <Checkbox
                      color="purple"
                      status={filters['tags'] ? (filters['tags'][collapsible.label] ? (filters['tags'][collapsible.label].includes(category) ? ('checked') : ('unchecked')) : ('unchecked')) : ('unchecked')}
                      onPress={() => {
                        addCategory(collapsible.label, category);
                      }}
                    />
                  </View>
                </View>
              </Collapsible>
            ))}
          </View>
        </View>
      ))}
      <Button onPress={goBack}>Save Tags</Button>
       <View style={{justifyContent:"center", width:"100%" }}>
        <Text style={{fontWeight:"bold", textAlign: 'center', margin: 5}}>
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

    </ScrollView>
  );
};

export default EventTags;