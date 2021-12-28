import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const uncheckedIcon = {
  android: "md-checkmark",
  ios: "ios-checkmark",
};

const checkedIcon = {
  android: "md-create",
  ios: "ios-create",
};

const MonthPlanItem = (props) => {
  const [checked, setChecked] = useState(props.checked);
  const [doneIcon, setDoneIcon] = useState(
    checked ? checkedIcon : uncheckedIcon
  );
  const [crossedText, setCrossedText] = useState(
    checked
      ? { textDecorationLine: "line-through", textDecorationStyle: "solid" }
      : {}
  );

  const onCheckHandler = () => {
    const icon = checked ? checkedIcon : uncheckedIcon;
    setDoneIcon(icon);
    setChecked((prevState) => !prevState);
    setCrossedText(
      checked
        ? { textDecorationLine: "line-through", textDecorationStyle: "solid" }
        : {}
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.timeNtitle}>
        <Ionicons
          name={Platform.OS === "android" ? doneIcon.android : doneIcon.ios}
          size={20}
          color="black"
          onPress={onCheckHandler}
        />
        <View>
          <Text style={{ ...styles.text, ...crossedText }}>{props.title}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Ionicons
          name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
          size={20}
          color="black"
          onPress={props.onDel}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 2,
    backgroundColor: "white",
    borderColor: Colors.primary,
    borderWidth: 1,
    flexDirection: "row",
    alignSelf: "flex-start",
  },
  timeNtitle: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  text: {
    fontSize: 15,
    marginHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: "row",
  },
});

export default MonthPlanItem;
