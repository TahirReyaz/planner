import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import defaultStyles from "../../constants/default-styles";
import PercentageBar from "./PercentageBar";
import Colors from "../../constants/Colors";

const GoalItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <View style={{ ...styles.container, ...defaultStyles.styledContainer }}>
      <View style={styles.titleNbuttons}>
        <Text style={styles.title}>{props.data.goal}</Text>
        <View style={styles.buttonContainer}>
          <Ionicons
            name="md-trash"
            size={25}
            color={Colors.red}
            onPress={props.onDel}
          />
          <Ionicons
            name={showDetails ? "md-caret-up" : "md-caret-down"}
            size={25}
            color="grey"
            style={{ marginLeft: 10 }}
            onPress={() => {
              setShowDetails((prevState) => !prevState);
            }}
          />
        </View>
      </View>
      {showDetails && (
        <View>
          <View style={styles.controlRow}>
            <Ionicons
              name={"md-remove-circle"}
              size={25}
              color="grey"
              onPress={props.onDecCompleted}
            />
            <Text>{props.data.completed}</Text>
            <Ionicons
              name={"md-add-circle"}
              size={25}
              color="grey"
              onPress={props.onIncCompleted}
            />
            <Text>{props.data.objName} out of</Text>
            <Ionicons
              name={"md-remove-circle"}
              size={25}
              color="grey"
              onPress={props.onDecTotal}
            />
            <Text>{props.data.total}</Text>
            <Ionicons
              name={"md-add-circle"}
              size={25}
              color="grey"
              onPress={props.onIncTotal}
            />
          </View>
          <View style={{ ...styles.controlRow, justifyContent: "center" }}>
            <Ionicons
              name={"md-remove-circle"}
              size={25}
              color="grey"
              onPress={props.onDecStep}
            />
            <Text style={{ marginHorizontal: 10 }}>
              {props.data.step} {props.data.step === 1 ? "step" : "steps"}
            </Text>
            <Ionicons
              name={"md-add-circle"}
              size={25}
              color="grey"
              onPress={props.onIncStep}
            />
          </View>
        </View>
      )}
      <PercentageBar
        color={props.data.color}
        percentage={((props.data.completed * 100) / props.data.total).toFixed(
          1
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
  titleNbuttons: { flexDirection: "row", justifyContent: "space-between" },
  title: { fontSize: 20 },
  buttonContainer: {
    flexDirection: "row",
  },
  controlRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 5,
    alignItems: "center",
  },
});

export default GoalItem;
