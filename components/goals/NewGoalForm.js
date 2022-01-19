import React, { useReducer, useCallback } from "react";
import { View, StyleSheet, Text, Button, Platform, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";

import Colors from "../../constants/Colors";
import InputText from "../UI/InputText";
import defaultStyles from "../../constants/default-styles";

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

const NewGoalForm = (props) => {
  console.log("in new goals form");
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      goal: "New Goal",
      objName: "Chapter",
      total: "1",
      completed: "1",
      color: Colors.neonGreen,
    },
    inputValidities: {
      goal: true,
      objName: true,
      total: true,
      completed: true,
      color: true,
    },
    formIsValid: true,
  });

  const textChangeHandler = useCallback(
    (input, value, validity) => {
      console.log(value, input);
      dispatchFormState({
        type: FORM_UPDATE,
        value,
        isValid: validity,
        input,
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
    console.log("in submit handler");
    if (!formState.formIsValid) {
      Alert.alert("Wrong Input", "Please check errors in the form", [
        { text: "OK" },
      ]);
      return;
    }
    console.log(formState.inputValues);
    onAdd(
      formState.inputValues.goal,
      formState.inputValues.objName,
      formState.inputValues.total,
      formState.inputValues.completed,
      formState.inputValues.color
    );
  }, [formState, onAdd]);

  const colorPicker = (
    <Picker
      selectedValue={formState.inputValues.color}
      style={{ width: 100 }}
      onValueChange={colorChangeHandler}
      mode="dropdown"
    >
      <Picker.Item
        label="Green"
        value={Colors.green}
        color={Colors.neonGreen}
      />
      <Picker.Item label="Blue" value={Colors.blue} color={Colors.blue} />
      <Picker.Item label="Yellow" value={Colors.yellow} color={Colors.yellow} />
      <Picker.Item label="Orange" value={Colors.orange} color={Colors.orange} />
      <Picker.Item label="Red" value={Colors.red} color={Colors.red} />
    </Picker>
  );

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={defaultStyles.styledContainer}>
          <InputText
            keyboardType="default"
            error="Please enter a valid task!"
            onInputChange={textChangeHandler.bind(this, "goal")}
            initialValue={formState.inputValues.goal}
            initiallyValid={true}
            required
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Button title="ADD" color={Colors.primary} onPress={submitHandler} />
        </View>
      </View>
      <View style={styles.row}>
        <View style={defaultStyles.styledContainer}>
          <InputText
            keyboardType="default"
            error="Please enter a valid task!"
            onInputChange={textChangeHandler.bind(this, "objName")}
            initialValue={formState.inputValues.objName}
            initiallyValid={true}
            required
          />
        </View>

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
      </View>
      <View style={styles.row}>
        <View style={defaultStyles.styledContainer}>
          <InputText
            keyboardType="numeric"
            min={1}
            error="Please enter a valid task!"
            onInputChange={textChangeHandler.bind(this, "total")}
            initialValue={formState.inputValues.total}
            initiallyValid={true}
            required
          />
        </View>
        <View style={defaultStyles.styledContainer}>
          <InputText
            keyboardType="number-pad"
            min={1}
            error="Please enter a valid task!"
            onInputChange={textChangeHandler.bind(this, "completed")}
            initialValue={formState.inputValues.completed}
            initiallyValid={true}
            required
          />
        </View>
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
    marginVertical: 5,
  },
});

export default NewGoalForm;
