import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Button, Checkbox } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getUsers, saveUsers } from "../services/StoreService";
import { Collapsible } from "react-native-fast-collapsible";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];
const SPORTTYPES = [Sport, Sports, Sportss];

// Use eventtype to create a list of objects with id, title and checked and store to array
console.log();

const Interests = ({ route, navigation }) => {
  const [users, setUsers] = useState([]);
  const [sportlist, setSportlist] = useState(
    SPORTTYPES.map((event, idx) => ({ id: idx, title: event, checked: false }))
  );
  const { method, username, email, password } = route.params ?? {};

  useEffect(() => {
    console.log("End of Signup");
    if (method === "signup" && username && email && password) {
      getUsers().then((_users) => {
        console.log("signup", username, email, password);
        setUsers((_users) => [..._users, { username, email, password }]);
      });
    }
  }, []);

  useEffect(() => {
    console.log("Saving users");
    saveUsers(users);
  }, [users]);

  const [isVisible, setVisibility] = useState(false);

  const toggleVisibility = () => {
    setVisibility((previous) => !previous);
  };

  const [checked, setChecked] = useState(false);

  return (
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
          flex: 1,
          // alignItems: "center",
          // justifyContent: "center",
          backgroundColor: "yellow",
        }}>
        <View style={{ alignItems: "center" }}>
          <Text>Your Interest</Text>
        </View>
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
      </View>
    </View>
  );
};

export default Interests;
