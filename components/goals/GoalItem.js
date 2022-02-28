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
            <View style={styles.incDec}>
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
            </View>
            <Text>
              {props.data.objName}
              {props.data.completed === 1 ? "" : "s"} out of
            </Text>
            <View style={styles.incDec}>
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
          </View>
          <View style={{ ...styles.controlRow, justifyContent: "center" }}>
            <Text>Change by </Text>
            <View style={styles.incDec}>
              <Ionicons
                name={"md-remove-circle"}
                size={25}
                color="grey"
                onPress={props.onDecStep}
              />
              <Text style={{ marginHorizontal: 10 }}>{props.data.step}</Text>
              <Ionicons
                name={"md-add-circle"}
                size={25}
                color="grey"
                onPress={props.onIncStep}
              />
            </View>
            <Text>
              {" "}
              {props.data.objName}
              {props.data.step === 1 ? "" : "s"}
            </Text>
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
  incDec: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: 100,
    borderColor: Colors.primary,
    borderRadius: 5,
    borderWidth: 2,
    marginHorizontal: 2,
    paddingHorizontal: 5,
  },
  controlRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 5,
    alignItems: "center",
  },
});

export default GoalItem;
