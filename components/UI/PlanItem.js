import React from "react";
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

const PlanItem = (props) => {
  const doneIcon = props.checked ? checkedIcon : uncheckedIcon;
  const crossedText = props.checked
    ? { textDecorationLine: "line-through", textDecorationStyle: "solid" }
    : {};

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View>
          <Ionicons
            name={Platform.OS === "android" ? doneIcon.android : doneIcon.ios}
            size={20}
            color="black"
            onPress={props.onCheck}
          />
        </View>
        {props.title.length < props.max && (
          <View>
            <Text style={{ ...styles.text, ...crossedText }}>
              {props.title}
            </Text>
          </View>
        )}
        <View>
          <Ionicons
            name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
            size={20}
            color="black"
            onPress={props.onDel}
          />
        </View>
      </View>
      {props.title.length >= props.max && (
        <View>
          <Text style={{ ...styles.text, ...crossedText }}>{props.title}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 5,
    marginVertical: 5,
    padding: 2,
    backgroundColor: "white",
    borderColor: Colors.primary,
    borderWidth: 1,
    alignSelf: "flex-start",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 15,
    marginHorizontal: 5,
  },
});

export default PlanItem;
