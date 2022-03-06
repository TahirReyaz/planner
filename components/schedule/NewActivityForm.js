import React, { useState, useReducer, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/Colors";
import InputText from "../UI/InputText";
import defaultStyles from "../../constants/default-styles";
import MyButton from "../UI/MyButton";

const FORM_UPDATE = "FORM_UPDATE";
const FORM_RESET = "FORM_RESET";

const initialFormState = {
  inputValues: {
    task: "New Task",
    time: new Date(),
    color: Colors.green,
  },
  inputValidities: {
    task: true,
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
    const newTime = new Date(state.inputValues.time);
    newTime.setMinutes(newTime.getMinutes() + 1);
    return {
      ...initialFormState,
      inputValues: {
        ...initialFormState.inputValues,
        time: newTime,
      },
    };
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
      onValueChange={colorChangeHandler}
      mode="dropdown"
      style={{
        marginTop: -8,
      }}
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
          style={{
            ...defaultStyles.styledInput,
            marginVertical: 10,
            paddingTop: 5,
          }}
          onPress={() => setShow(true)}
        >
          <Text
            style={{
              fontFamily: "montserrat",
            }}
          >
            {moment(formState.inputValues.time).format("h:mm A")}
          </Text>
        </TouchableOpacity>
        {show && timePicker}
        <View
          style={{
            ...defaultStyles.styledInput,
            paddingHorizontal: 0,
            paddingVertical: 0,
            marginVertical: 0,
            height: 40,
            width: 150,
            marginTop: 5,
          }}
        >
          {colorPicker}
        </View>
        <View style={{ flexDirection: "row", height: 35, marginTop: 5 }}>
          <MyButton
            title="ADD"
            color={Colors.primary}
            onPress={submitHandler}
            icon={
              <Ionicons
                name="md-add"
                size={25}
                color="white"
                style={{ marginLeft: 5, marginRight: -5 }}
              />
            }
          />
        </View>
      </View>
      <View>
        <InputText
          inputStyle={defaultStyles.styledInput}
          label="Task"
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
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default NewActivityForm;
