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

import Colors from "../../constants/Colors";
import InputText from "../UI/InputText";
import defaultStyles from "../../constants/default-styles";

const FORM_UPDATE = "FORM_UPDATE";
const FORM_RESET = "FORM_RESET";

const initialFormState = {
  inputValues: {
    task: "New Task",
    time: new Date(),
    color: Colors.green,
  },
  inputValidities: {
    task: false,
    time: true,
    color: true,
  },
  formIsValid: true,
};

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
  } else if (action.type === FORM_RESET) {
    return initialFormState;
  }
  return state;
};

const NewActivityForm = (props) => {
  const [show, setShow] = useState(false);
  const [formState, dispatchFormState] = useReducer(
    formReducer,
    initialFormState
  );

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

  const { onAdd } = props;

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong Input", "Please check errors in the form", [
        { text: "OK" },
      ]);
      return;
    }
    onAdd(
      formState.inputValues.task,
      formState.inputValues.time,
      formState.inputValues.color
    );
    dispatchFormState({ type: FORM_RESET });
  }, [formState, onAdd]);

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
      <Picker.Item label="Green" value={Colors.green} color={Colors.green} />
      <Picker.Item label="Blue" value={Colors.blue} color={Colors.blue} />
      <Picker.Item label="Yellow" value={Colors.yellow} color={Colors.yellow} />
      <Picker.Item label="Orange" value={Colors.orange} color={Colors.orange} />
      <Picker.Item label="Red" value={Colors.red} color={Colors.red} />
    </Picker>
  );

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          style={{ ...defaultStyles.styledContainer, marginVertical: 10 }}
          onPress={() => setShow(true)}
        >
          <Text>{moment(formState.inputValues.time).format("h:mm A")}</Text>
        </TouchableOpacity>
        {show && timePicker}
        <View
          style={{
            ...defaultStyles.styledContainer,
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
      <View style={defaultStyles.styledContainer}>
        <InputText
          keyboardType="default"
          error="Please enter a valid task!"
          onInputChange={textChangeHandler}
          value={formState.inputValues.task}
          initiallyValid={true}
          required
          multiline
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
});

export default NewActivityForm;
