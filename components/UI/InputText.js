import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";

const InputText = (props) => {
  const value = props.value ? props.value : "";
  const { onInputChange, initiallyValid } = props;

  useEffect(() => {
    setValidity(initiallyValid);
    console.log("effect", validity);
  }, [initiallyValid, setValidity]);
  const [validity, setValidity] = useState(initiallyValid);

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
    setValidity(isValid);
    onInputChange(text, validity);
  };

  return (
    <View style={{ ...styles.formControl, ...props.containerStyle }}>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <TextInput
        style={[props.inputStyle, { fontFamily: "montserrat" }]}
        {...props}
        value={value}
        onChangeText={onTextChange}
      />
      {console.log(validity)}
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
    fontFamily: "montserrat",
  },
  errorContainer: {
    marginVertical: 5,
  },
  error: {
    fontSize: 13,
    color: "red",
    fontFamily: "montserrat",
  },
});

export default InputText;
