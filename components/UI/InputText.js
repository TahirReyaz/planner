import React, { useEffect, useReducer } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case INPUT_BLUR:
      return {
        ...state,
        edited: true,
      };
    default:
      return state;
  }
};

const InputText = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : "",
    isValid: props.initiallyValid,
    edited: false,
  });

  const { onInputChange } = props;

  useEffect(() => {
    if (inputState.edited === true) {
      onInputChange(inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange]);

  const onTextChange = (text) => {
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    dispatch({
      type: INPUT_CHANGE,
      value: text,
      isValid,
    });
  };

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };

  return (
    <View style={styles.formControl}>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <TextInput
        {...props}
        style={styles.input}
        value={inputState.value}
        onChangeText={onTextChange}
        onBlur={lostFocusHandler}
      />
      {!inputState.isValid && inputState.edited && (
        <View style={styles.errorContainer}>
          <Text style={styles.error}>{props.error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: "100%",
  },
  label: {
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "white",
    borderRadius: 10,
    fontSize: 20,
  },
  errorContainer: {
    marginVertical: 5,
  },
  error: {
    fontSize: 13,
    color: "red",
  },
});

export default InputText;
