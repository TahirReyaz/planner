import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView
} from 'react-native';

const MonthPlanScreen = props => {

  return (
    <SafeAreaView>
      <View>
        <Text>Month Plan Screen</Text>
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

export default MonthPlanScreen;