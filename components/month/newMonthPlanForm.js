import React, { useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/Colors";
import InputText from "../InputText";

const NewMonthPlanForm = (props) => {
  const [task, setTask] = useState("");
  const [isValid, setIsValid] = useState(false);

  const textChangeHandler = (value, validity) => {
    setTask(value);
    setIsValid(validity);
  };

  const submitHandler = useCallback(() => {
    if (isValid) {
      return;
    }
    props.onAdd(task);
  }, [task, isValid]);

  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <InputText
          keyboardType="default"
          error="Please enter a valid task!"
          onInputChange={textChangeHandler}
          initialValue=""
          initiallyValid={false}
          required
        />
      </View>

      <Ionicons
        name={Platform.OS === "android" ? "md-add-circle-outline" : "ios-add"}
        size={25}
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
    width: "80%",
  },
  input: {
    width: "85%",
  },
});

export default NewMonthPlanForm;
