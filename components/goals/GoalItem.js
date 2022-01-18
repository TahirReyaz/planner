import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import defaultStyles from "../../constants/default-styles";
import PercentageBar from "./PercentageBar";

const GoalItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <View style={{ ...styles.container, ...defaultStyles.styledContainer }}>
      <View style={styles.titleNbuttons}>
        <Text style={styles.title}>{props.data.title}</Text>
        <View style={styles.buttonContainer}>
          <Ionicons name="md-trash" size={25} color="red" onPress={() => {}} />
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
        <View style={styles.controls}>
          <Ionicons
            name={"md-remove-circle"}
            size={25}
            color="grey"
            onPress={() => {}}
          />
          <Text>{props.data.completed}</Text>
          <Ionicons
            name={"md-add-circle"}
            size={25}
            color="grey"
            onPress={() => {}}
          />
          <Text>{props.data.objName} out of</Text>
          <Ionicons
            name={"md-remove-circle"}
            size={25}
            color="grey"
            onPress={() => {}}
          />
          <Text>{props.data.total}</Text>
          <Ionicons
            name={"md-add-circle"}
            size={25}
            color="grey"
            onPress={() => {}}
          />
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
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 5,
    alignItems: "center",
  },
});

export default GoalItem;
