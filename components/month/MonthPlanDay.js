import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import Colors from "../../constants/Colors";
import MonthPlanItem from "./MonthPlanItem";
import * as monthActions from "../../store/actions/monthActions";

const MonthDayPlan = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
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
        {props.plans && props.plans.length > 0 && (
          <View style={styles.buttonContainer}>
            <Ionicons
              name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
              size={23}
              color="red"
              onPress={props.onDel}
            />
            <Ionicons
              name={showDetails ? "md-caret-up" : "md-caret-down"}
              size={20}
              color="grey"
              style={{ marginHorizontal: 10 }}
              onPress={() => {
                setShowDetails((prevState) => !prevState);
              }}
            />
          </View>
        )}
      </View>
      {showDetails && (
        <View style={styles.itemContainer}>
          {props.plans &&
            props.plans.map((plan) => (
              <MonthPlanItem
                title={plan.task}
                id={plan.id}
                key={plan.id}
                checked={plan.checked}
                onCheck={() =>
                  dispatch(monthActions.checkPlanItem(plan.id, props.id))
                }
                onDel={() =>
                  dispatch(monthActions.delPlanItem(plan.id, props.id))
                }
              />
            ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 5,
    backgroundColor: "white",
    borderBottomColor: Colors.primary,
    borderLeftColor: Colors.primary,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderBottomLeftRadius: 10,
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeNtitle: {
    flexDirection: "row",
    justifyContent: "flex-start",
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

export default MonthDayPlan;