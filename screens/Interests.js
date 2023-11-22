import React, { useEffect, useState } from "react";
import {
  View,
  Touchable,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Button, Checkbox, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StoreService from "../services/StoreService";
import { Collapsible } from "react-native-fast-collapsible";
import { LinearGradient } from "expo-linear-gradient";
import EventTypes from "../data/EventType.json";
import WelcomeBackground from "./Components/WelcomeBackground";
import { AntDesign } from "@expo/vector-icons";

const Interests = ({ route, navigation }) => {
  let globalSportIdCounter = 1; // Initialize a global counter for all types
  let globalCheckboxIdCounter = 0;
  let globalCollapsibleIdCounter = 1;

  const { method, username, email, password } = route.params ?? {};

  const [checkboxes, setCheckboxes] = useState(
    [].concat(
      ...Object.keys(EventTypes).map((label) =>
        EventTypes[label].map((sport) => ({
          id: globalSportIdCounter++,
          title: sport,
          checked: false,
        }))
      )
    )
  );

  const toggleCheckbox = (id) => {
    const checkboxData = [...checkboxes];
    console.log(id);
    console.log(checkboxData[id]);
    checkboxData[id].checked = !checkboxData[id].checked;
    console.log(checkboxData[id]);
    setCheckboxes(checkboxData);
  };

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

  const FindAllInterests = () => {
    const selectedCheckBoxes = checkboxes
      .filter((cb) => cb.checked === true)
      .map((cb) => cb.title);
    console.log(selectedCheckBoxes);
    return selectedCheckBoxes;
  };

  const SaveInterest = async () => {
    console.log("Saving Interest");
    console.log({ username, email, password, interest: FindAllInterests() });
    const UpdateUserStatus = await StoreService.updateUser(username, {
      username: username,
      email: email,
      password: password,
      friends: [],
      interest: FindAllInterests(),
    });
    const LogginUser = await StoreService.assignActive(email);
    if (UpdateUserStatus && LogginUser) {
      navigation.navigate("Home");
    }
  };

  return (
    <WelcomeBackground>
      <View
        style={{
          margin: "10%",
          // backgroundColor: "blue",
          height: "100%",
        }}>
        <View style={{ alignItems: "flex-end" }}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <MaterialCommunityIcons name='home' size={30} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 8,
            // backgroundColor: "yellow",
          }}>
          <View style={{ alignItems: "center" }}>
            <Text
              variant='displaySmall'
              style={{ color: "white", fontWeight: "bold" }}>
              Your Interest
            </Text>
          </View>
          <ScrollView>
            {collapsibles.map((collapsible) => (
              <View style={{}} key={collapsible.id}>
                <TouchableOpacity
                  onPress={() => toggleVisibility(collapsible.id)}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      margin: "5%",
                    }}>
                    <Text
                      variant='titleLarge'
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        // margin: "5%",
                      }}>
                      {collapsible.label}
                    </Text>
                    {collapsible.visible ? (
                      <AntDesign name='up' size={24} color='black' />
                    ) : (
                      <AntDesign name='down' size={24} color='black' />
                    )}
                  </View>
                </TouchableOpacity>
                {EventTypes[collapsible.label]?.map((category, categoryIdx) => {
                  const checkboxId = globalCheckboxIdCounter++;
                  return (
                    <Collapsible
                      isVisible={collapsible.visible}
                      key={`${collapsible.id}-${categoryIdx}`}>
                      <View
                        style={{
                          alignItems: "center",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          padding: "5%",
                        }}>
                        <Text
                          variant='titleMedium'
                          style={{ color: "white", fontWeight: "bold" }}>
                          {category}
                        </Text>
                        <Checkbox
                          key={checkboxId}
                          status={
                            checkboxes[checkboxId]?.checked
                              ? "checked"
                              : "unchecked"
                          }
                          onPress={() => {
                            toggleCheckbox(checkboxId);
                          }}
                        />
                      </View>
                    </Collapsible>
                  );
                })}
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={{ flex: 1 }}>
          <Button mode='contained' onPress={() => SaveInterest()}>
            Done
          </Button>
        </View>
      </View>
    </WelcomeBackground>
  );
};

export default Interests;
