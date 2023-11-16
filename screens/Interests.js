import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Button, Checkbox } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StoreService from "../services/StoreService";
import { Collapsible } from "react-native-fast-collapsible";
import { LinearGradient } from "expo-linear-gradient";
import EventTypes from "../data/EventType.json";

// const EventTypes = ["Sport", "Sports", "Sportss"];
// const EventTypes = {
//   Sport: ["Soccer", "Tennis"],
//   Social: ["Meet up", "other thing"],
// };

const Interests = ({ route, navigation }) => {
  let globalSportIdCounter = 1; // Initialize a global counter for all types
  let globalCheckboxIdCounter = 0;
  // const [sportlist, setSportlist] = useState(
  //   EventTypes.map((event, idx) => ({ id: idx, title: event, checked: false }))
  // );
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
  const { method, username, email, password } = route.params ?? {};

  // useEffect(() => {
  //   console.log("End of Signup");
  //   if (method === "signup" && username && email && password) {
  //     setUser({
  //       username: username,
  //       email: email,
  //       password: password,
  //       interest: [],
  //     });
  //     addUser(user);
  //     // assignActiveU;
  //   }

  //   console.log(checkboxes);
  // }, []);

  // useEffect(() => {
  //   console.log("Saving user");
  //   updateUser(username, { username, email, password, interest: [] });
  // }, [user]);

  const [isVisible, setVisibility] = useState(false);

  const toggleVisibility = () => {
    setVisibility((previous) => !previous);
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
      interest: FindAllInterests(),
    });
    if (UpdateUserStatus) {
      navigation.navigate("Home");
    }
  };

  const toggleCheckbox = (id) => {
    const checkboxData = [...checkboxes];
    console.log(id);
    console.log(checkboxData[id]);
    checkboxData[id].checked = !checkboxData[id].checked;
    console.log(checkboxData[id]);
    setCheckboxes(checkboxData);
  };

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={["#9B57D0", "#9D76BB"]}
      style={{ flex: 1 }}>
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
            // alignItems: "center",
            // justifyContent: "center",
            backgroundColor: "yellow",
          }}>
          <View style={{ alignItems: "center" }}>
            <Text>Your Interest</Text>
          </View>
          <ScrollView>
            {/* {Object.keys(EventTypes).map((label, idx) => (
              <View style={{ backgroundColor: "#4287f5" }} key={idx}>
                <TouchableOpacity onPress={toggleVisibility}>
                  <Text>{label}</Text>
                </TouchableOpacity>
                {EventTypes[label]?.map((category, categoryIdx) => (
                  const checkboxID = globalCheckboxIdCounter++;

                  <Collapsible
                    isVisible={isVisible}
                    key={`${idx}-${categoryIdx}`}>
                    <View
                      style={{
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                      key={category}>
                      <Text>{category}</Text>
                      <Checkbox
                        key={globalCheckboxIdCounter++}
                        status={checked ? "checked" : "unchecked"}
                        onPress={() => {
                          toggleCheckbox(globalCheckboxIdCounter);
                        }}
                      />
                    </View>
                  </Collapsible>
                ))}
              </View>
            ))} */}
            {Object.keys(EventTypes).map((label, idx) => (
              <View style={{ backgroundColor: "#4287f5" }} key={idx}>
                <TouchableOpacity onPress={toggleVisibility}>
                  <Text>{label}</Text>
                </TouchableOpacity>
                {EventTypes[label]?.map((category, categoryIdx) => {
                  const checkboxId = globalCheckboxIdCounter++;
                  return (
                    <Collapsible
                      isVisible={isVisible}
                      key={`${idx}-${categoryIdx}`}>
                      <View
                        style={{
                          alignItems: "center",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}>
                        <Text>{category}</Text>
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
            {/* <TouchableOpacity onPress={toggleVisibility}>
              <Text>Expand / Collapse</Text>
            </TouchableOpacity> */}

            {/* <Collapsible isVisible={isVisible}>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "red",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                <Text>Type</Text>
                <Checkbox
                  status={checked ? "checked" : "unchecked"}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "red",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                <Text>Type</Text>
                <Checkbox
                  status={checked ? "checked" : "unchecked"}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "red",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                <Text>Type</Text>
                <Checkbox
                  status={checked ? "checked" : "unchecked"}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "red",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                <Text>Type</Text>
                <Checkbox
                  status={checked ? "checked" : "unchecked"}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "red",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                <Text>Type</Text>
                <Checkbox
                  status={checked ? "checked" : "unchecked"}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "red",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                <Text>Type</Text>
                <Checkbox
                  status={checked ? "checked" : "unchecked"}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "red",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                <Text>Type</Text>
                <Checkbox
                  status={checked ? "checked" : "unchecked"}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "red",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                <Text>Type</Text>
                <Checkbox
                  status={checked ? "checked" : "unchecked"}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "red",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                <Text>Type</Text>
                <Checkbox
                  status={checked ? "checked" : "unchecked"}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
              </View>
            </Collapsible>
            <TouchableOpacity onPress={toggleVisibility}>
              <Text>Expand / Collapse</Text>
            </TouchableOpacity>

            <Collapsible isVisible={isVisible}>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "red",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                <Text>Type</Text>
                <Checkbox
                  status={checked ? "checked" : "unchecked"}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
              </View>
            </Collapsible>
            <TouchableOpacity onPress={toggleVisibility}>
              <Text>Expand / Collapse</Text>
            </TouchableOpacity>

            <Collapsible isVisible={isVisible}>
              {EventTypes.map((type, idx) => (
                <View
                  style={{
                    flexDirection: "row",
                    backgroundColor: "red",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                  <Text>{type}</Text>
                  <Checkbox
                    key={type.id}
                    checked={type.checked}
                    status={type.checked ? "checked" : "unchecked"}
                    onPress={() => {
                      setChecked(!checked);
                    }}
                  />
                </View>
              ))}
            </Collapsible> */}
          </ScrollView>
        </View>
        <View style={{ flex: 1 }}>
          <Button mode='contained' onPress={() => SaveInterest()}>
            Done
          </Button>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Interests;
