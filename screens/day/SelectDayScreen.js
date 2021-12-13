import React from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';

const SelectDayScreen = props => {

  return (
    <View>
      <Text>Select Day Screen</Text>
    </View>
  );
};

export const screenOptions = navData => {
  return {
    headerTitle: 'Select Day',
  }
};


const styles = StyleSheet.create({
  
});

export default SelectDayScreen;