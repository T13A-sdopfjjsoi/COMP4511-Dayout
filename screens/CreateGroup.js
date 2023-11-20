import React, { useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StoreService from "../services/StoreService";
import WelcomeBackground from "./Components/WelcomeBackground";

const CreateGroup = ({ navigation, navigation: { goBack } }) => {
  const [user, setUser] = useState(null);
  const [groupname, setGroupname] = useState("");
  // const [grouptitle, setGrouptitle] = useState("");
  const [groupsubtitle, setGroupsubtitle] = useState("");
  const [groupmembers, setGroupmembers] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const LoggedUser = await StoreService.getActive();
      console.log(LoggedUser);
      setUser(LoggedUser);
    };
    getUser();
  }, []);

  const CreateGroupSubmit = async () => {
    if (groupname === "" || groupsubtitle === "") {
      alert("Please fill all the fields");
      return;
    }
    const ExistGroup = await StoreService.getGroup(groupname);
    if (ExistGroup === null) {
      console.log("pass");

      const AddGroupStatus = await StoreService.addGroup({
        name: groupname,
        // title: grouptitle,
        subtitle: groupsubtitle,
        members: [user.username, ...groupmembers],
        owner: user.username,
        datemarked: {},
      });
      if (AddGroupStatus) {
        navigation.navigate("Social");
      }
    }
  };

  return (
    <WelcomeBackground>
      <View
        style={{
          height: "100%",
          margin: "10%",
        }}>
        <View style={{ alignItems: "flex-end" }}>
          <TouchableOpacity onPress={() => goBack()}>
            <MaterialCommunityIcons name='home' size={30} />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text
            variant='displaySmall'
            style={{ color: "white", fontWeight: "bold" }}>
            Create Group
          </Text>
        </View>
        <View style={{ margin: "5%" }}>
          <View style={{ marginBottom: 20 }}>
            <TextInput
              theme={{ roundness: 25 }}
              style={{
                overflow: "hidden",
                borderStyle: "solid",
                borderColor: "black",
                borderRadius: 25,
              }}
              label='Group Name'
              value={groupname}
              onChangeText={(groupname) => setGroupname(groupname)}
            />
          </View>
          {/* <View style={{ marginBottom: 20 }}>
            <TextInput
              theme={{ roundness: 25 }}
              style={{
                overflow: "hidden",
                borderStyle: "solid",
                borderColor: "black",
                borderRadius: 25,
              }}
              label='Group Title'
              value={grouptitle}
              onChangeText={(title) => setGrouptitle(title)}
            />
          </View> */}
          <View style={{ marginBottom: 20 }}>
            <TextInput
              theme={{ roundness: 25 }}
              style={{
                overflow: "hidden",
                borderStyle: "solid",
                borderColor: "black",
                borderRadius: 25,
              }}
              label='Subtitle'
              value={groupsubtitle}
              onChangeText={(subtitle) => setGroupsubtitle(subtitle)}
            />
          </View>
          <View>
            <Button mode='contained' onPress={() => CreateGroupSubmit()}>
              Create Group
            </Button>
          </View>
        </View>
      </View>
    </WelcomeBackground>
  );
};

export default CreateGroup;
