import React from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import UIStyles from '../styles';

const DashGrid = () => {
  return (
    <ScrollView style={{ width: '100%', height:"100%", marginBottom: 10 }}>
      <Text>For you</Text>
      <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1, marginBottom: 10 }}>
        <Button mode="contained" style={UIStyles.scrollStackItem}>
          Item 1
        </Button>
        <Button mode="contained" style={UIStyles.scrollStackItem}>
          Item 2
        </Button>
        <Button mode="contained" style={UIStyles.scrollStackItem}>
          Item 3
        </Button>
        <Button mode="contained" style={UIStyles.scrollStackItem}>
          Item 4
        </Button>
      </ScrollView>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginRight: 10 }}>
        <View style={{width:"48%", alignItems:"center"}}>
          <Text>Interested</Text>
          <Button mode="contained" style={UIStyles.stack}>
            Stack 1 - This will be a stack of images
          </Button>
        </View>
        <View style={{width:"48%", alignItems:"center"}}>
          <Text>Joined</Text>
          <Button mode="contained" style={UIStyles.stack}>
            Stack 2 
          </Button>
        </View>
        <View>
        <Text>Activity</Text>
        <Text>Everything Else down here....</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default DashGrid;
