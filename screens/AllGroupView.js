import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import WelcomeBackground from "./Components/WelcomeBackground";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StoreService from "../services/StoreService";

const AllGroupView = ({ route, navigation, navigation: { goBack } }) => {
  //   const navigation = useNavigation();
  const [groups, setGroups] = useState([]);
  const [Activeusername, setActiveusername] = useState("");

  // find all the groups
  useEffect(() => {
    const fetchdata = async () => {
      const allGroups = await StoreService.getAllGroups();
      console.log(allGroups);
      setGroups(allGroups);
      const LoggedUser = await StoreService.getActive();
      setActiveusername(LoggedUser.username);
    };
    fetchdata();
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
    const Groupdetail = await StoreService.getGroup(group.id);
    const updategroup = await StoreService.updateGroup(group.id, {
      ...Groupdetail,
      members: [LoggedUser.username, ...group.members],
    });
    console.log(`${LoggedUser.username} joined ${group.title}`);
    navigation.navigate("Social");
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
          {/* <Button onPress={() => removegroups()}>Remove Groups</Button>
          <Button onPress={() => seeallgroups()}>All Groups</Button> */}
        </View>
        <View style={{ alignItems: "center", margin: 10 }}>
          <Text
            variant='displaySmall'
            style={{ color: "white", fontWeight: "bold" }}>
            Discover Groups
          </Text>
          <Button
            onPress={() => navigation.navigate("CreateGroup")}
            buttonColor='white'>
            Create You Own Group
          </Button>
        </View>
        <ScrollView style={{ marginBottom: "20%" }}>
          {groups.map((group, idx) => (
            <View style={{ margin: "2%" }} key={idx}>
              <Card>
                <Card.Cover source={{ uri: `https://picsum.photos/7${idx}` }} />
                <Card.Title title={group.name} subtitle={group.subtitle} />
                <Card.Actions>
                  <Button
                    disabled={(group.members || []).includes(Activeusername)}
                    onPress={() => JoinGroup(group)}>
                    Join
                  </Button>
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
