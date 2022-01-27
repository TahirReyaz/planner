import React, { useCallback, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
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
      console.log("Not Valid");
      return;
    }
    onAdd(task);
  }, [task, isValid, onAdd]);

  return (
    <View style={styles.container}>
      <InputText
        inputStyle={styles.input}
        containerStyle={styles.inputContainer}
        keyboardType="default"
        error="Enter a valid task!"
        onInputChange={textChangeHandler}
        value={task}
        initiallyValid={true}
        required
      />
      <Ionicons
        name={Platform.OS === "android" ? "md-add-circle-outline" : "ios-add"}
        size={28}
        color="black"
        onPress={submitHandler}
      />
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
    width: "90%",
    paddingHorizontal: 5,
  },
});

export default NewPlanItemForm;
