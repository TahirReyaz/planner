import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";

const InputText = (props) => {
  const [value, setValue] = useState(
    props.initialValue ? props.initialValue : ""
  );
  const [validity, setValidity] = useState(props.initiallyValid);
  const { onInputChange } = props;

  const onTextChange = (text) => {
    console.log(text);
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
    setValue(text);
    setValidity(isValid);
  };

  const lostFocusHandler = () => {
    onInputChange(value, validity);
  };

  return (
    <View style={styles.formControl}>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <TextInput
        {...props}
        style={styles.input}
        value={value}
        onChangeText={onTextChange}
        onBlur={lostFocusHandler}
      />
      {!validity && (
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
    paddingHorizontal: 0,
    paddingVertical: 0,
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
