import React, { useState, useReducer, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

import Colors from "../constants/Colors";
import InputText from "./InputText";

const FORM_UPDATE = "UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValues: updatedValues,
      inputValidities: updatedValidities,
    };
  }
  return state;
};

const Form = (props) => {
  const [show, setShow] = useState(false);
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      task: "",
      time: new Date(),
      color: "green",
    },
    inputValidities: {
      task: false,
      time: true,
      color: true,
    },
    formIsValid: false,
  });

  const textChangeHandler = useCallback(
    (value, validity) => {
      dispatchFormState({
        type: FORM_UPDATE,
        value: value,
        isValid: validity,
        input: "task",
      });
    },
    [dispatchFormState]
  );

  const timeChangeHandler = useCallback(
    (event, selectedTime) => {
      const currentTime = selectedTime || formState.inputValues.time;
      setShow(Platform.OS === "ios");

      dispatchFormState({
        type: FORM_UPDATE,
        value: currentTime,
        isValid: true,
        input: "time",
      });
    },
    [dispatchFormState]
  );

  const colorChangeHandler = useCallback(
    (value, index) => {
      dispatchFormState({
        type: FORM_UPDATE,
        value,
        isValid: true,
        input: "color",
      });
    },
    [dispatchFormState]
  );

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong Input", "Please check errors in the form", [
        { text: "OK" },
      ]);
      return;
    }
    props.onAdd(
      formState.inputValues.task,
      formState.inputValues.time,
      formState.inputValues.color
    );
  }, [formState]);

  const timePicker = (
    <DateTimePicker
      value={formState.inputValues.time}
      mode="time"
      is24Hour={false}
      display="default"
      onChange={timeChangeHandler}
    />
  );

  const colorPicker = (
    <Picker
      selectedValue={formState.inputValues.color}
      style={{ width: 100 }}
      onValueChange={colorChangeHandler}
      mode="dropdown"
    >
      <Picker.Item label="Green" value="green" color="green" />
      <Picker.Item label="Yellow" value="yellow" color="yellow" />
      <Picker.Item label="Red" value="red" color="red" />
    </Picker>
  );

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.input} onPress={() => setShow(true)}>
          <Text>{moment(formState.inputValues.time).format("h:mm A")}</Text>
        </TouchableOpacity>
        {show && timePicker}
        <View
          style={{
            ...styles.input,
            paddingHorizontal: 0,
            paddingVertical: 0,
            marginVertical: 0,
          }}
        >
          {colorPicker}
        </View>
        <View style={{ flexDirection: "row" }}>
          <Button title="ADD" color={Colors.primary} onPress={submitHandler} />
        </View>
      </View>
      <View>
        <InputText
          label="Task"
          keyboardType="default"
          error="Please enter a valid task!"
          onInputChange={textChangeHandler}
          initialValue=""
          initiallyValid={false}
          required
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 10,
    backgroundColor: "white",
    borderBottomColor: Colors.primary,
    borderLeftColor: Colors.primary,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderBottomLeftRadius: 10,
    fontSize: 20,
  },
});

export default Form;
