import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import WelcomeBackground from "./Components/WelcomeBackground";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StoreService from "../services/StoreService";

const AllGroupView = ({ route, navigation, navigation: { goBack } }) => {
  //   const navigation = useNavigation();
  const [groups, setGroups] = useState([]);

  // find all the groups
  useEffect(() => {
    const getAllGroups = async () => {
      const allGroups = await StoreService.getAllGroups();
      console.log(allGroups);
      setGroups(allGroups);
    };
    getAllGroups();
  }, []);

  const removegroups = async () => {
    const remove = await StoreService.removeAllGroups();
    console.log(remove);
  };

  const seeallgroups = async () => {
    const allGroups = await StoreService.getAllGroups();
    console.log(allGroups);
  };

  const JoinGroup = async (group) => {
    const LoggedUser = await StoreService.getActive();
    const GroupsDetail = await StoreService.updateGroup(group.id, {
      id: group.id,
      title: group.title,
      subtitle: group.subtitle,
      members: [LoggedUser.username, ...group.members],
    });
    console.log(`${LoggedUser.username} joined ${group.title}`);
    navigation.navigate("Home");
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
          <Button onPress={() => removegroups()}>Remove Groups</Button>
          <Button onPress={() => seeallgroups()}>All Groups</Button>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text
            variant='displaySmall'
            style={{ color: "white", fontWeight: "bold" }}>
            Discover Groups
          </Text>
          <Button onPress={() => navigation.navigate("CreateGroup")}>
            Create You Own Group
          </Button>
        </View>
        <ScrollView style={{ marginBottom: "20%" }}>
          {groups.map((group, idx) => (
            <View style={{ margin: "2%" }} key={idx}>
              <Card>
                <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
                <Card.Title title={group.title} subtitle={group.subtitle} />
                <Card.Actions>
                  <Button onPress={() => JoinGroup(group)}>Join</Button>
                </Card.Actions>
              </Card>
            </View>
          ))}
        </ScrollView>
      </View>
    </WelcomeBackground>
  );
};

export default AllGroupView;
