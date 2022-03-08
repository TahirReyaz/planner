import React, { useCallback, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import InputText from "./InputText";
import Colors from "../../constants/Colors";

const NewPlanItemForm = (props) => {
  const [task, setTask] = useState("New Task");
  const [isValid, setIsValid] = useState(true);

  const textChangeHandler = (value, validity) => {
    setTask(value);
    setIsValid(validity);
  };

  const { onAdd } = props;

  const submitHandler = useCallback(() => {
    if (!isValid) {
      Alert.alert("Wrong Input", "Please check errors in the form", [
        { text: "OK" },
      ]);
      return;
    }
    onAdd(task);
  }, [task, isValid, onAdd]);

  return (
    <View style={styles.container}>
      <InputText
        inputStyle={[styles.input, { width: props.smallWidth ? "80%" : "90%" }]}
        containerStyle={styles.inputContainer}
        smallWidth={props.smallWidth}
        keyboardType="default"
        error="Enter a valid task!"
        onInputChange={textChangeHandler}
        value={task}
        initiallyValid={true}
        required
      />
      <View style={{ marginTop: task === "" ? -27 : 0 }}>
        <Ionicons
          name={Platform.OS === "android" ? "md-add-circle-outline" : "ios-add"}
          size={28}
          color="black"
          onPress={submitHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderColor: Colors.primary,
    borderRadius: 5,
    borderWidth: 2,
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    paddingHorizontal: 5,
  },
});

export default NewPlanItemForm;
