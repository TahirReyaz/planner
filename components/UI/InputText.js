import React from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";

const InputText = (props) => {
  const value = props.value ? props.value : "";

  const validity = props.initiallyValid;
  const { onInputChange } = props;

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
    onInputChange(text, validity);
  };

  return (
    <View style={styles.formControl}>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <TextInput
        style={props.inputStyle}
        {...props}
        value={value}
        onChangeText={onTextChange}
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
    marginVertical: 0,
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
