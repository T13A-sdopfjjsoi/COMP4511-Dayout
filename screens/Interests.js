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
import { getUsers, saveUsers } from "../services/StoreService";
import { Collapsible } from "react-native-fast-collapsible";
import { LinearGradient } from "expo-linear-gradient";

const SPORTTYPES = ["Sport", "Sports", "Sportss"];

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
          </ScrollView>
        </View>
        <View style={{ flex: 1 }}>
          <Button
            mode='contained'
            onPress={() =>
              navigation.navigate("Home", {
                method: "signup",
                username: username,
                email: email,
                password: password,
                interest: [],
              })
            }>
            Done
          </Button>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Interests;
