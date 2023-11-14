import React from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import UIStyles from "../styles.js";

const DetailsScreen = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={UIStyles.backButton}>
      <Button title="Back" onPress={handleGoBack} />
    </View>
  );
};

export default DetailsScreen;