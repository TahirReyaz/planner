import React from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';

const ScheduleScreen = props => {

  return (
    <View>
      <Text>Schedule Screen</Text>
    </View>
  );
};

export const screenOptions = navData => {
  return {
    headerTitle: 'Schedule',
  }
};


const styles = StyleSheet.create({
  
});

export default ScheduleScreen;