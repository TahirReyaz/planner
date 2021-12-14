import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView
} from 'react-native';

const SelectMonthScreen = props => {

  return (
    <SafeAreaView>
      <Text>Select Month Screen</Text>
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

export default SelectMonthScreen;