import React from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { Button, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const SocialGroupComponent = ({ ActiveUser, groups }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {!ActiveUser ? (
        <View style={styles.errormsg}>
          <Text variant='displaySmall'>Please login to continue</Text>
        </View>
      ) : (
        <ScrollView style={{ marginBottom: 10 }}>
          <View style={styles.grouptop}>
            <Text variant='titleLarge'>Groups</Text>
            <Button
              onPress={() => navigation.navigate("GroupsView", ActiveUser)}
              mode='contained'>
              + Join Group
            </Button>
          </View>
          {groups.length === 0 ? (
            // Render this when groups is an empty array
            <View style={styles.groupnone}>
              <Text>Join a group</Text>
            </View>
          ) : (
            // Render this when groups is not an empty array
            <ScrollView
              horizontal={true}
              contentContainerStyle={{ flexGrow: 1, marginBottom: 10 }}>
              {groups.map((group, idx) => (
                <TouchableOpacity
                  key={group.id}
                  mode='contained'
                  style={styles.groupbtn}
                  onPress={() =>
                    navigation.navigate("Group", { id: group.id })
                  }>
                  <ImageBackground
                    source={{ uri: `https://picsum.photos/7${idx}` }}
                    imageStyle={{ borderRadius: 15 }}
                    style={styles.groupimg}>
                    <Text style={styles.grouptext}>{group.name}</Text>
                  </ImageBackground>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  errormsg: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  grouptop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 5,
  },
  groupnone: { justifyContent: "center", alignItems: "center" },
  groupbtn: {
    width: 150,
    height: 150,
    margin: 5,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  groupimg: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  grouptext: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0",
  },
});

export default SocialGroupComponent;
