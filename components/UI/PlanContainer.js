import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import PlanItem from "./PlanItem";
import NewPlanItemForm from "./NewPlanItemForm";
import defaultStyles from "../../constants/default-styles";

const PlanContainer = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <View style={{ ...defaultStyles.styledContainer, margin: 5 }}>
      <View style={styles.summaryContainer}>
        <View style={styles.timeNtitle}>
          <View>
            <Text style={styles.text}>{props.time}</Text>
          </View>
          {!showDetails && (
            <View>
              <Text style={styles.text}>
                {props.plans && props.plans.length > 0
                  ? props.plans[0].task
                  : "No plans for this day"}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.buttonContainer}>
          {props.plans && props.plans.length > 0 && (
            <Ionicons
              name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
              size={23}
              color="red"
              onPress={props.onClear}
            />
          )}
          <Ionicons
            name={showDetails ? "md-caret-up" : "md-add-circle"}
            size={25}
            color="grey"
            style={{ marginHorizontal: 10 }}
            onPress={() => {
              setShowDetails((prevState) => !prevState);
            }}
          />
        </View>
      </View>
      {showDetails && (
        <View style={styles.itemContainer}>
          {props.plans &&
            props.plans.map((plan) => (
              <PlanItem
                title={plan.task}
                id={plan.id}
                key={`${props.time}${plan.id}`}
                checked={plan.checked}
                max={17}
                onCheck={() => props.onCheck(plan.id, props.id)}
                onDel={() => props.onDel(plan.id, props.id)}
              />
            ))}
          <NewPlanItemForm onAdd={(task) => props.onAdd(task)} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeNtitle: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
  },
  text: {
    fontSize: 20,
    marginRight: 5,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  itemContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default PlanContainer;
