import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView
} from 'react-native';

const SelectDayScreen = props => {

  return (
    <SafeAreaView>
      <Text>Select Day Screen</Text>
    </SafeAreaView>
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