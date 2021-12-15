import React from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Activity = props => {
  const styles = StyleSheet.create({
    container: {
      margin: 5,
      padding: 5,
      backgroundColor: 'white',
      borderBottomColor: props.color,
      borderLeftColor: props.color,
      borderBottomWidth: 5,
      borderLeftWidth: 5,
      borderBottomLeftRadius: 10,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    timeNtitle: {
      flexDirection: 'row',
      justifyContent: 'flex-start'
    },
    text: {
      fontSize: 20,
      marginRight: 5
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.timeNtitle}>
        <View>
          <Text style={styles.text}>{props.time}</Text>
        </View>
        <View>
          <Text style={styles.text}>{props.title}</Text>
        </View>
      </View>
      <View>
        <Ionicons
          name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
          size={23}
          color="red"
        />
      </View>
    </View>
  );
}


export default Activity;