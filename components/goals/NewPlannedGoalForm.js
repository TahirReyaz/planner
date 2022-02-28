import React, { useCallback, useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import Colors from "../../constants/Colors";
import InputText from "../UI/InputText";
import defaultStyles from "../../constants/default-styles";

const NewPlannedGoalForm = (props) => {
  const [goal, setGoal] = useState("New Goal");
  const [validity, setValidity] = useState(true);
  const [color, setColor] = useState(Colors.neonGreen);

  const textChangeHandler = (value, textValidity) => {
    setValidity(textValidity);
    setGoal(value);
  };

  const colorChangeHandler = (value, index) => {
    setColor(value);
  };

  const { onAdd } = props;

  const submitHandler = () => {
    if (!validity) {
      Alert.alert("Wrong Input", "Please check errors in the form", [
        { text: "OK" },
      ]);
      return;
    }
    onAdd(goal.trim(), color);
    // dispatchFormState({ type: FORM_RESET });
  };

  const colorPicker = (
    <Picker
      selectedValue={color}
      style={{
        marginTop: -8,
      }}
      onValueChange={colorChangeHandler}
      mode="dropdown"
    >
      <Picker.Item
        label="Green"
        value={Colors.neonGreen}
        color={Colors.neonGreen}
      />
      <Picker.Item label="Blue" value={Colors.blue} color={Colors.blue} />
      <Picker.Item label="Yellow" value={Colors.yellow} color={Colors.yellow} />
      <Picker.Item label="Orange" value={Colors.orange} color={Colors.orange} />
      <Picker.Item label="Red" value={Colors.red} color={Colors.red} />
    </Picker>
  );

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView>
        <View style={styles.row}>
          <View>
            <InputText
              inputStyle={defaultStyles.styledInput}
              label="Goal"
              keyboardType="default"
              error="Please enter a valid task!"
              onInputChange={textChangeHandler}
              value={goal}
              initiallyValid={true}
              required
            />
          </View>
          <View style={{ flexDirection: "row", height: 35, marginTop: 5 }}>
            <Button
              title="ADD"
              color={Colors.primary}
              onPress={submitHandler}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View
            style={{
              ...defaultStyles.styledInput,
              paddingHorizontal: 0,
              paddingVertical: 0,
              marginVertical: 0,
              height: 40,
              width: 150,
              marginTop: 5,
            }}
          >
            {colorPicker}
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
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
    flexGrow: 0.3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
});

export default NewPlannedGoalForm;