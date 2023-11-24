import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import UIStyles from "../styles.js";

const DetailsScreen = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={UIStyles.backButton}>
      <Button buttonColor="#63519f" textColor="white" onPress={handleGoBack}>Back</Button>
    </View>
  );
};

export default DetailsScreen;