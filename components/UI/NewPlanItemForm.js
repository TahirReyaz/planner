import React, { useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import InputText from "../InputText";
import Colors from "../../constants/Colors";

const NewPlanItemForm = (props) => {
  const [task, setTask] = useState("");
  const [isValid, setIsValid] = useState(false);

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
      <View style={styles.input}>
        <InputText
          keyboardType="default"
          error="Please enter a valid task!"
          onInputChange={textChangeHandler}
          initialValue="New Task"
          initiallyValid={false}
          required
        />
      </View>

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
  input: {
    flex: 1,
  },
});

export default NewPlanItemForm;
