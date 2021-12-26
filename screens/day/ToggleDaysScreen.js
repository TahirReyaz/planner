import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView
} from 'react-native';

const ToggleDaysScreen = props => {

  return (
    <SafeAreaView>
      <Text>Toggle Days Screen</Text>
    </SafeAreaView>
  );
};

export const screenOptions = navData => {
  return {
    headerTitle: 'Toggle Days',
  }
};


const styles = StyleSheet.create({
  
});

export default ToggleDaysScreen;