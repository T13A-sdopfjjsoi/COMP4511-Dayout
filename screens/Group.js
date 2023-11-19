import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import StoreService from "../services/StoreService";

const Group = ({ route }) => {
  const { id } = route.params ?? {};
  const [group, setGroup] = useState([]);

  useEffect(() => {
    const getGroup = async () => {
      const group = await StoreService.getGroup(id);
      setGroup(group);
    };
    getGroup();
  }, []);

  return (
    <View>
      <Text>{group.title}</Text>
    </View>
  );
};

export default Group;
