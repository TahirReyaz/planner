import React, { useState, useReducer } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Button,
  Platform,
  TouchableOpacity
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';

import Colors from '../constants/Colors';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
  switch(action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid
      };
    case INPUT_BLUR:
      return {
        ...state,
        edited: true
      };
    default:
      return state;
  }
}

const Form = () => {
  const [time, setTime] = useState(new Date(1598051730000));
  const [color, setColor] = useState();
  const [show, setShow] = useState(false);
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: '',
    isValid: false,
    edited: false
  });

  const onTextChange = text => {
    let isValid = true;
    if (text.trim().length === 0) {
      isValid = false;
    }
    dispatch({
      type: INPUT_CHANGE,
      value: text,
      isValid
    })
  }
  const lostFocusHandler = () => {
    dispatch({type: INPUT_BLUR})
  }

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShow(Platform.OS === 'ios');
    setTime(currentTime);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity 
          style={styles.input}
          onPress={() => setShow(true)}
        >
          <Text>{time.toLocaleTimeString()}</Text>
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            value={time}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={onChangeTime}
          />
        )}
        <View style={{flexDirection:'row'}}>
          <Button title="Cancel" color="red" />
          <Button title="ADD" color={Colors.primary} />
        </View>
      </View>
      <View style={styles.input}>
        <Picker
          selectedValue={color}
          onValueChange={(value, index) => setColor(value) }
          mode="dropdown"
        >
          <Picker.Item label="Green" value="green" color='green' />
          <Picker.Item label="Yellow" value="yellow" color='yellow' />
          <Picker.Item label="Red" value="red" color='red' />
        </Picker>
      </View>
      <View>
        <TextInput 
          style={styles.input} 
          value={inputState.value} 
          onChangeText={onTextChange}
          onBlur={lostFocusHandler}
        />
        {!inputState.isValid && inputState.edited && (
          <View style={styles.errorContainer}>
            <Text style={styles.error}>Required</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: 'white'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 10,
    backgroundColor: 'white',
    borderBottomColor: Colors.primary,
    borderLeftColor: Colors.primary,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderBottomLeftRadius: 10,
    fontSize: 20
},
  errorContainer: {
    marginVertical: 5
  },
  error: {
    fontSize: 13,
    color: 'red'
  }
});

export default Form;