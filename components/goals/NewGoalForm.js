import React, { useReducer, useCallback } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/Colors";
import InputText from "../UI/InputText";
import MyButton from "../UI/MyButton";
import defaultStyles from "../../constants/default-styles";

const FORM_UPDATE = "FORM_UPDATE";
const FORM_RESET = "FORM_RESET";

const initialFormState = {
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

const NewGoalForm = (props) => {
  const [formState, dispatchFormState] = useReducer(
    formReducer,
    initialFormState
  );

  const textChangeHandler = (input, value, validity) => {
    let validatedValue = value;
    if (input === "total" || input === "completed") {
      validatedValue = value.replace(/[^0-9]/g, "");
    }
    dispatchFormState({
      type: FORM_UPDATE,
      value: validatedValue,
      isValid: validity,
      input,
    });
  };

  const colorChangeHandler = (value, index) => {
    dispatchFormState({
      type: FORM_UPDATE,
      value,
      isValid: true,
      input: "color",
    });
  };

  const { onAdd } = props;

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong Input", "Please check errors in the form", [
        { text: "OK" },
      ]);
      return;
    }
    onAdd(
      formState.inputValues.goal.trim(),
      formState.inputValues.objName.trim(),
      formState.inputValues.total,
      formState.inputValues.completed,
      formState.inputValues.color
    );
    dispatchFormState({ type: FORM_RESET });
  }, [formState, onAdd]);

  const colorPicker = (
    <Picker
      selectedValue={formState.inputValues.color}
      style={{
        marginTop: -8,
      }}
      onValueChange={colorChangeHandler}
      dropdownIconRippleColor={Colors.primary}
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
        <View style={styles.textInput}>
          <InputText
            inputStyle={[defaultStyles.styledInput, { width: "80%" }]}
            label="Goal"
            keyboardType="default"
            error="Please enter a valid goal!"
            onInputChange={textChangeHandler.bind(this, "goal")}
            value={formState.inputValues.goal}
            initiallyValid={true}
            required
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            height: 35,
            marginTop: !formState.inputValidities.goal ? -20 : 5,
          }}
        >
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
      <View style={styles.row}>
        <View style={styles.textInput}>
          <InputText
            inputStyle={[defaultStyles.styledInput, { width: "80%" }]}
            label="Task name"
            keyboardType="default"
            maxLength={11}
            error="Please enter a valid task name!"
            onInputChange={textChangeHandler.bind(this, "objName")}
            value={formState.inputValues.objName}
            initiallyValid={true}
            required
          />
        </View>

        <View
          style={{
            ...defaultStyles.styledInput,
            paddingHorizontal: 0,
            paddingVertical: 0,
            marginVertical: 0,
            height: 40,
            width: 150,
            marginTop: !formState.inputValidities.objName ? -20 : 15,
          }}
        >
          {colorPicker}
        </View>
      </View>
      <View style={[styles.row, { alignItems: "flex-start" }]}>
        <View style={styles.textInput}>
          <InputText
            inputStyle={[defaultStyles.styledInput, { width: "80%" }]}
            containerStyle={{ width: "100%" }}
            label={`Total ${formState.inputValues.objName}s`}
            keyboardType="number-pad"
            min={1}
            error="Must be greater than 0!"
            onInputChange={textChangeHandler.bind(this, "total")}
            value={formState.inputValues.total}
            initiallyValid={true}
            required
          />
        </View>
        <View style={styles.textInput}>
          <InputText
            inputStyle={[defaultStyles.styledInput, { width: "80%" }]}
            label={`Completed ${formState.inputValues.objName}s`}
            keyboardType="number-pad"
            min={1}
            error="Must be a positive number!"
            onInputChange={textChangeHandler.bind(this, "completed")}
            value={formState.inputValues.completed}
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
    margin: 5,
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  textInput: {
    width: "45%",
  },
});

export default NewGoalForm;
