import React from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import Colors from '../../constants/Colors';

import Activity from '../../components/Activity';

const ScheduleScreen = props => {

  return (
    <View style={styles.screen}>
      <Text>Schedule Screen</Text>
      <Activity title="Activity" time="2:30" color={Colors.primary}/>
      <Activity title="Activity" time="2:30" color={Colors.primary}/>
      <Activity title="Activity" time="2:30" color={Colors.primary}/>
    </View>
  );
};

export const screenOptions = navData => {
  return {
    headerTitle: 'Schedule',
  }
};


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#E5E5E5'
  }
});

export default ScheduleScreen;