import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import PlanItem from "../UI/PlanItem";
import NewPlanItemForm from "../UI/NewPlanItemForm";
import defaultStyles from "../../constants/default-styles";
import Colors from "../../constants/Colors";
import PercentageBar from "./PercentageBar";

const PlannedGoalContainer = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  const showDetailsIcon =
    props.plans && props.plans.length > 0 ? "md-caret-down" : "md-add-circle";

  return (
    <View style={{ ...defaultStyles.styledContainer, margin: 5 }}>
      <View style={styles.summaryContainer}>
        <View>
          <Text style={styles.title}>
            {props.title.length < 21
              ? props.title
              : props.title.substring(0, 18) + "..."}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Ionicons
            name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
            size={23}
            color={Colors.red}
            onPress={props.onDel}
          />
          <Ionicons
            name={showDetails ? "md-caret-up" : showDetailsIcon}
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
        <View style={styles.itemContainer}>
          {props.plans &&
            props.plans.map((plan) => (
              <PlanItem
                title={plan.task}
                id={plan.id}
                key={`${props.time}${plan.id}`}
                checked={plan.checked}
                max={17}
                onCheck={() => props.onCheckTask(plan.id, props.id)}
                onDel={() => props.onDelTask(plan.id, props.id)}
              />
            ))}
          <NewPlanItemForm onAdd={(task) => props.onAddTask(task)} />
        </View>
      )}
      <PercentageBar
        color={props.color}
        percentage={((props.tasks.length * 100) / props.tasks.length).toFixed(
          1
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontFamily: "montserrat",
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

export default PlannedGoalContainer;
