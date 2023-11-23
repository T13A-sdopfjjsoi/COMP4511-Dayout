import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import StoreService from "../services/StoreService.js";
import SocialFriendComponent from "./Components/SocialFriendComponent.js";
import SocialGroupComponent from "./Components/SocialGroupComponent.js";
import SocialTopBar from "./Components/SocialTopBar.js";

const Social = () => {
  const [LoggedUser, setLoggedUser] = useState({});
  const [ActiveUser, setActiveUser] = useState(null);
  const [groups, setGroups] = useState([]);
  const [friends, setFriends] = useState([]);

  const fetchData = async () => {
    console.log(
      "fetching data--------------------------------------------------------------"
    );
    console.log("LoggedUser", LoggedUser);
    const allGroups = await StoreService.getAllGroups();
    console.log("Mynameis", LoggedUser.username);
    // console.log("Groupsss", allGroups);

    setGroups(
      allGroups.filter((group) => group.members.includes(LoggedUser.username))
    );

    const allFriends = await StoreService.getUser(LoggedUser.email);

    setFriends(allFriends.friends || []);
  };

  const updateActiveUser = async () => {
    console.log(
      "update active user-----------------------------------------------------"
    );
    const Userdetail = await StoreService.getUser(LoggedUser.email);
    setActiveUser(Userdetail);
    setFriends(Userdetail.friends || []);
  };

  useFocusEffect(
    useCallback(() => {
      const getuser = async () => {
        const user = await StoreService.getActive();
        setLoggedUser(user);
      };
      getuser();
    }, [])
  );

  useEffect(() => {
    (async () => {
      // updateScreen();
      console.log("Mid check", LoggedUser);
      if (Object.keys(LoggedUser).length > 0) {
        fetchData();
        updateActiveUser();
      }
    })();
  }, [LoggedUser]);

  const RemoveFriend = async (username) => {
    try {
      // Get the user's data
      const LoggedUser = await StoreService.getUser(ActiveUser.email);

      // Update the friends array
      const updatedFriends = LoggedUser.friends.filter(
        (friend) => friend !== username
      );

      // Update the user's data on the backend
      await StoreService.updateUser(LoggedUser.username, {
        ...LoggedUser,
        friends: updatedFriends,
      });

      const status = await StoreService.assignActive(LoggedUser.email);

      if (status) {
        updateActiveUser();
      }
    } catch (error) {
      console.error("Error updating friend status:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <SocialTopBar ActiveUser={ActiveUser} />
      <SocialGroupComponent ActiveUser={ActiveUser} groups={groups} />
      <SocialFriendComponent
        ActiveUser={ActiveUser}
        friends={friends}
        RemoveFriend={RemoveFriend}
      />
    </View>
  );
};

export default Social;
