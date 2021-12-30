import React, { useCallback } from "react";
import { View, StyleSheet } from "react-native";

import Colors from "../../constants/Colors";
import InputText from "../InputText";

const newMonthPlanForm = (props) => {
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
      <InputText
        label="Task"
        keyboardType="default"
        error="Please enter a valid task!"
        onInputChange={textChangeHandler}
        initialValue=""
        initiallyValid={false}
        required
      />
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
  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 10,
    backgroundColor: "white",
    borderBottomColor: Colors.primary,
    borderLeftColor: Colors.primary,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderBottomLeftRadius: 10,
    fontSize: 20,
  },
});

export default newMonthPlanForm;
