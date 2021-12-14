import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView
} from 'react-native';

const ScheduleScreen = props => {

  return (
    <SafeAreaView>
      <View>
        <Text>Schedule Screen</Text>
      </View>
    </SafeAreaView>
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